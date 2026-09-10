// src/voice/localModel.js
const LLAMA_SERVER_URL = 'http://localhost:8080';

export async function queryLocalModel(prompt, options = {}) {
    const response = await fetch(`${LLAMA_SERVER_URL}/completion`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: prompt,
            n_predict: options.maxTokens || 300,
            temperature: options.temperature || 0.7,
            stop: options.stop || ['</s>', 'User:'],
            stream: false,
            ...options
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Model server error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.content || data.response || '';
}

export function buildGEVSystemPrompt() {
    return `You are an AI assistant for "God's Eye View" — a 3D real-time globe simulator.

You have access to these tools to control the map:
1. fly_to_location - Fly the camera to a specific place
2. get_entity_context - Get info about a selected entity
3. control_radio - Control radio playback
4. set_layer_visibility - Show/hide layers (flights, ships, etc.)
5. annotate_map - Draw on the map
6. clear_annotations - Clear map drawings
7. adjust_camera_zoom - Zoom in/out
8. get_current_view_state - Get current map state

When the user asks to go somewhere or do something, respond with a JSON tool call:
{"tool": "tool_name", "params": {"param1": "value"}}

Examples:
- User: "Show me New York" → {"tool": "fly_to_location", "params": {"location": "New York"}}
- User: "Zoom in" → {"tool": "adjust_camera_zoom", "params": {"direction": "in"}}

If just asking a question, respond naturally. Keep responses brief.`;
}

export function parseToolResponse(text) {
    const jsonMatch = text.match(/\{[\s\S]*"tool"[\s\S]*\}/);
    if (jsonMatch) {
        try {
            const parsed = JSON.parse(jsonMatch[0]);
            if (parsed.tool) {
                return {
                    isTool: true,
                    tool: parsed.tool,
                    params: parsed.params || {}
                };
            }
        } catch (e) {}
    }
    return {
        isTool: false,
        text: text
    };
}