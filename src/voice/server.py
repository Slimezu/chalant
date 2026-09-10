# server.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from llama_cpp import Llama
import json
import os

app = FastAPI()

# Enable CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# !!! CHANGE THIS TO YOUR MODEL PATH !!!
MODEL_PATH = "D:/3dprobjects/SlimeE/dist/SlimeE (SLICK)/Slick.gguf"  # <--- CHANGE THIS LINE

print(f"Loading model from: {MODEL_PATH}")
llm = Llama(model_path=MODEL_PATH, n_ctx=4096, n_threads=8)
print("Model loaded successfully!")

class CompletionRequest(BaseModel):
    prompt: str
    n_predict: int = 300
    temperature: float = 0.7
    stop: list[str] = ["</s>", "User:"]
    stream: bool = False

@app.post("/completion")
async def completion(request: CompletionRequest):
    try:
        response = llm.create_completion(
            prompt=request.prompt,
            max_tokens=request.n_predict,
            temperature=request.temperature,
            stop=request.stop,
            stream=request.stream,
            echo=False,
        )
        
        return {"content": response["choices"][0]["text"]}
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health():
    return {"status": "ok", "model": os.path.basename(MODEL_PATH)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)