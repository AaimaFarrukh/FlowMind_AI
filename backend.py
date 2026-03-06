from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from config import GROQ_API_KEY

app = FastAPI()

client = Groq(api_key=GROQ_API_KEY)

# to allow the requests from the browser
app.add_middleware(
    CORSMiddleware,
    allow_origins = ['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

class RequestData(BaseModel):
    text: str
    action: str
    language: str

def build_prompt(text, action, language):

    language_key = (language or "english").strip().lower()

    lang_name = {
        "english": "English",
        "urdu": "Urdu (اردو)",
        "roman urdu": "Roman Urdu",
        "roman-urdu": "Roman Urdu",
        "spanish": "Spanish",
        "french": "French", 
        "arabic": "Arabic (العربية)"
    }.get(language_key, "English")

    if action == "summarize":
        return f"Summarize this text in a concise way in {lang_name}. Respond only in {lang_name}.\n\n{text}"

    elif action == "translate":
        return f"Translate this text to {lang_name}. Output only in {lang_name}. Do not use English unless {lang_name} is English:\n\n{text}"

    elif action == "simplify":
        return f"Simplify this text in very simple {lang_name} words. Respond only in {lang_name}:\n\n{text}"
    elif action == "eli5":
        return f"Explain this text like I'm 5 in {lang_name}. Respond only in {lang_name}:\n\n{text}"
    elif action == "bullets":
        return f"Convert this text into bullet points in {lang_name}. Respond only in {lang_name}:\n\n{text}"

    else:
        return f"Explain this text in {lang_name}:\n\n{text}"

@app.post("/process")
async def process(data: RequestData):

    try:

        prompt = build_prompt(data.text, data.action, data.language)

        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=0.3
        )
        result = completion.choices[0].message.content
        return {"result": result}
    except Exception as e:
        return {"result": f"Error: {str(e)}"}
    