from fastapi import FastAPI
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

app = FastAPI()
genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-2.5-flash")

# Allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/query/{topic}")
def generate_text(topic : str):
    response = model.generate_content(topic)
    print(response.text)
    return {"response": response.text}