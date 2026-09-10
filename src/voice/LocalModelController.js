// src/voice/LocalModelController.js
import { queryLocalModel, buildGEVSystemPrompt, parseToolResponse } from './localModel.js';
import { createGevActionRunner } from './gevActions.js';

const STATUS = {
    idle: 'OFF',
    listening: 'LISTENING',
    executing: 'EXECUTING',
    error: 'ERROR',
};

export class LocalModelController {
    constructor({ viewer, styleManager, dataManager, sceneDirector = null, annotations = null }) {
        this.viewer = viewer;
        this.styleManager = styleManager;
        this.dataManager = dataManager;
        this.sceneDirector = sceneDirector;
        this.annotations = annotations;
        this.runner = createGevActionRunner({ viewer, styleManager, dataManager, sceneDirector, annotations });
        
        this.status = 'idle';
        this.isListening = false;
        this.speechRecognition = null;
        this.conversationHistory = [];
        this.systemPrompt = buildGEVSystemPrompt();
        this.pushToTalkActive = false;
        
        this.ui = this.createUI();
        this.bindEvents();
    }

    createUI() {
        let root = document.getElementById('gev-voice-control');
        if (!root) {
            root = document.createElement('div');
            root.id = 'gev-voice-control';
            root.dataset.status = 'idle';
            root.dataset.speaker = 'idle';
            root.innerHTML = `
                <div class="gev-voice-heading">
                    <div class="gev-voice-kicker">LOCAL AI</div>
                    <div id="gev-voice-status">OFF</div>
                    <div class="gev-voice-cost">
                        <span id="gev-voice-cost-value" class="gev-voice-cost-value" data-level="ok">⚡ LOCAL</span>
                    </div>
                </div>
                <button id="gev-voice-button" type="button" aria-label="Voice control">
                    <span class="gev-mic-orbit"><img src="/mic.svg" alt="" /></span>
                    <span class="gev-mic-label">ON/OFF</span>
                </button>
                <div class="gev-voice-visualizer" aria-hidden="true">
                    ${Array.from({ length: 15 }, (_, index) => `<span style="--bar:${index}"></span>`).join('')}
                </div>
                <div class="gev-voice-readout">
                    <div id="gev-voice-detail">VOICE STANDBY</div>
                </div>
                <div id="gev-voice-help" class="gev-voice-help-tray">
                    <span class="gev-voice-help-kicker">VOICE CONTROL</span>
                    <span class="gev-voice-help-detail">Click mic to toggle · hold Space to talk</span>
                </div>
            `;
            const commandDock = document.getElementById('command-dock');
            if (commandDock) {
                commandDock.appendChild(root);
            } else {
                document.body.appendChild(root);
            }
        }
        return {
            root,
            button: root.querySelector('#gev-voice-button'),
            status: root.querySelector('#gev-voice-status'),
            detail: root.querySelector('#gev-voice-detail'),
            costValue: root.querySelector('#gev-voice-cost-value'),
        };
    }

    bindEvents() {
        this.ui.button.addEventListener('click', () => {
            if (this.isActive()) {
                this.stop();
            } else {
                this.start();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
                const target = e.target;
                if (target?.isContentEditable || target?.closest?.('input, textarea')) return;
                e.preventDefault();
                if (!this.isActive()) {
                    this.start({ pushToTalk: true });
                }
                this.pushToTalkActive = true;
            }
        });

        document.addEventListener('keyup', (e) => {
            if (e.code === 'Space' && this.pushToTalkActive) {
                e.preventDefault();
                this.pushToTalkActive = false;
                if (this.isActive() && this.isListening) {
                    this.stopListening();
                }
            }
        });
    }

    isActive() {
        return this.status !== 'idle' && this.status !== 'error';
    }

    async start({ pushToTalk = false } = {}) {
        if (this.isActive()) return;
        
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            this.setStatus('error', 'Speech recognition not supported');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.speechRecognition = new SpeechRecognition();
        this.speechRecognition.continuous = true;
        this.speechRecognition.interimResults = true;
        this.speechRecognition.lang = 'en-US';

        this.speechRecognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map(result => result[0].transcript)
                .join(' ');
            
            if (event.results[0].isFinal) {
                this.handleUserInput(transcript);
            } else {
                this.ui.detail.textContent = `🎤 ${transcript}`;
            }
        };

        this.speechRecognition.onerror = (event) => {
            if (event.error === 'not-allowed') {
                this.setStatus('error', 'Microphone permission denied');
            } else if (event.error !== 'no-speech') {
                this.setStatus('error', `Speech error: ${event.error}`);
            }
        };

        this.speechRecognition.onend = () => {
            if (this.isActive() && !this.pushToTalkActive) {
                try {
                    this.speechRecognition.start();
                } catch (e) {}
            }
        };

        this.isListening = true;
        this.pushToTalkActive = pushToTalk;
        this.setStatus('listening', pushToTalk ? '🎤 Hold Space to talk' : '🎤 Listening...');

        try {
            this.speechRecognition.start();
        } catch (e) {}

        this.conversationHistory = [
            { role: 'system', content: this.systemPrompt }
        ];
    }

    stop() {
        this.isListening = false;
        this.pushToTalkActive = false;
        
        if (this.speechRecognition) {
            try { this.speechRecognition.stop(); } catch (e) {}
            this.speechRecognition = null;
        }

        this.setStatus('idle', 'Voice off');
    }

    stopListening() {
        if (this.speechRecognition && this.isListening) {
            try { 
                this.speechRecognition.stop();
                setTimeout(() => {
                    if (this.isActive()) {
                        try {
                            this.speechRecognition.start();
                        } catch (e) {}
                    }
                }, 500);
            } catch (e) {}
        }
    }

    async handleUserInput(text) {
        if (!text.trim() || text.trim().length < 2) return;
        
        this.setStatus('executing', `🤔 Processing...`);
        
        this.conversationHistory.push({ role: 'user', content: text });

        try {
            let prompt = '';
            for (const msg of this.conversationHistory) {
                if (msg.role === 'system') {
                    prompt += `System: ${msg.content}\n\n`;
                } else if (msg.role === 'user') {
                    prompt += `User: ${msg.content}\n`;
                } else if (msg.role === 'assistant') {
                    prompt += `Assistant: ${msg.content}\n`;
                }
            }
            prompt += 'Assistant: ';

            const response = await queryLocalModel(prompt, {
                maxTokens: 500,
                temperature: 0.7,
            });

            const parsed = parseToolResponse(response);
            
            if (parsed.isTool) {
                await this.executeTool(parsed.tool, parsed.params);
                this.speakResponse('Action completed.');
            } else {
                this.speakResponse(parsed.text);
                this.conversationHistory.push({ role: 'assistant', content: parsed.text });
            }

            this.setStatus('listening', this.pushToTalkActive ? '🎤 Hold Space to talk' : '🎤 Listening...');

        } catch (error) {
            console.error('Model error:', error);
            this.setStatus('error', `Model error: ${error.message}`);
            this.speakResponse('Sorry, there was an error.');
            setTimeout(() => {
                if (this.isActive()) {
                    this.setStatus('listening', this.pushToTalkActive ? '🎤 Hold Space to talk' : '🎤 Listening...');
                }
            }, 2000);
        }
    }

    async executeTool(toolName, params) {
        const actionMap = {
            'fly_to_location': 'fly_to_location',
            'get_entity_context': 'get_entity_context',
            'control_radio': 'control_radio',
            'set_layer_visibility': 'set_layer_visibility',
            'annotate_map': 'annotate_map',
            'clear_annotations': 'clear_annotations',
            'adjust_camera_zoom': 'adjust_camera_zoom',
            'get_current_view_state': 'get_current_view_state'
        };

        const mappedAction = actionMap[toolName];
        if (!mappedAction) {
            console.warn(`Unknown tool: ${toolName}`);
            return;
        }

        try {
            const result = await this.runner(mappedAction, params);
            console.log('Tool result:', result);
            return result;
        } catch (error) {
            console.error('Tool execution error:', error);
            throw error;
        }
    }

    speakResponse(text) {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;
        this.ui.detail.textContent = `📢 ${text}`;
        utterance.onend = () => {
            if (this.isActive()) {
                this.ui.detail.textContent = this.pushToTalkActive ? '🎤 Hold Space to talk' : '🎤 Listening...';
            }
        };
        window.speechSynthesis.speak(utterance);
    }

    setStatus(status, detail) {
        this.status = status;
        this.ui.root.dataset.status = status;
        this.ui.status.textContent = STATUS[status] || STATUS.idle;
        this.ui.detail.textContent = detail || '';
        if (status === 'error') {
            this.ui.root.classList.add('error-dismissed');
        }
    }
}