import re
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict, Any

from app.services.fake_news_service import fake_news_service
from app.services.fact_verification_service import fact_verification_service

router = APIRouter(prefix="/chat", tags=["AI Chatbot"])

class ChatMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []

class ChatResponse(BaseModel):
    reply: str
    detected_intent: Optional[str] = "general"
    verification_card: Optional[Dict[str, Any]] = None

# Curated Forensic Intelligence Knowledge Base
FORENSIC_FAQ = [
    {
        "keywords": ["ela", "error level", "error level analysis"],
        "reply": (
            "**Error Level Analysis (ELA)** works by intentionally resaving an image at a known JPEG compression quality (e.g., 90%) and computing the difference between the original and resaved version.\n\n"
            "• **Original camera sensors** compress uniformly across all pixels.\n"
            "• **Manipulated, spliced, or inpainted areas** exhibit higher compression error rates, creating high-contrast glowing edges in the ELA heatmap.\n\n"
            "You can test this right now in our **Image Forensics** tab!"
        )
    },
    {
        "keywords": ["liveness", "liveness detection", "spoof", "presentation attack", "ibeta"],
        "reply": (
            "**Biometric Liveness Detection** verifies whether a facial biometric belongs to a live, physically present human or an artificial presentation attack.\n\n"
            "• **Passive Liveness**: Analyzes optical skin reflectance, micro-vessel blood flow (rPPG), and corneal light reflections without requiring user action.\n"
            "• **Active Liveness**: Prompts involuntary micro-movements (blinking, head yaw).\n"
            "• **Anti-Spoof Defense**: Blocks 2D printed masks, digital iPad replays, and 3D silicone hyper-realistic prosthetics (certified under ISO/IEC 30107-3)."
        )
    },
    {
        "keywords": ["deepfake video", "video deepfake", "temporal", "jitter", "keyframes"],
        "reply": (
            "**Deepfake Video Detection** in TruthLens AI uses a multi-stage temporal pipeline:\n\n"
            "1. **Keyframe Sampling**: Video is decomposed into keyframe sequences at regular intervals.\n"
            "2. **Facial Alignment**: 68-point facial landmark meshes isolate eyes, jawlines, and lip contours.\n"
            "3. **Temporal Inconsistency**: Deepfake algorithms often struggle with inter-frame continuity, resulting in subtle lighting flicker, boundary warping, and unnatural eye-blink intervals."
        )
    },
    {
        "keywords": ["how does it work", "how truthlens works", "architecture", "models"],
        "reply": (
            "**TruthLens AI** operates as a multi-modal verification suite with 4 dedicated engines:\n\n"
            "1. **Fake News Detector (NLP)**: TF-IDF feature extraction, sensationalism lexical filters, and journalistic attribution checks.\n"
            "2. **Image Forensics (CV)**: Error Level Analysis (ELA) + spatial high-frequency sensor noise variance.\n"
            "3. **Video Forensics (CNN)**: Keyframe decomposition + temporal biometric stability tracking.\n"
            "4. **AI Fact Verifier (RAG)**: Semantic evidence retrieval distinguishing between unsupported and debunked claims."
        )
    },
    {
        "keywords": ["pdf", "report", "certificate", "download report"],
        "reply": (
            "You can generate and download an **Academic Verification Certificate (PDF)** for any completed scan! Each report contains:\n\n"
            "• Unique Scan ID & Timestamp\n"
            "• Probabilistic Confidence Score (0–100%)\n"
            "• Forensic Anomaly Indicators\n"
            "• Verified Reference Sources & Citations"
        )
    }
]

@router.post("", response_model=ChatResponse)
def handle_chat(request: ChatRequest):
    user_msg = request.message.strip()
    if not user_msg:
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    msg_lower = user_msg.lower()

    # 1. Check if the user is asking to verify a statement / headline
    verification_triggers = [
        "verify", "check this", "is this real", "is this fake", "is this true",
        "fact check", "fake news", "rumor", "news:", "claim:"
    ]
    is_verification_request = any(t in msg_lower for t in verification_triggers) or len(user_msg.split()) >= 10

    if is_verification_request and not any(k in msg_lower for k in ["how do", "what is", "explain", "who are you"]):
        # Clean text
        clean_claim = re.sub(r'^(verify|check|is this true|is this fake|fact check):?\s*', '', user_msg, flags=re.IGNORECASE).strip()
        
        # Run fact verification
        verify_res = fact_verification_service.verify_claim(clean_claim)
        
        reply = (
            f"🔍 **Instant Forensic Triage Result**\n\n"
            f"**Verdict**: `{verify_res['prediction'].upper()}`\n"
            f"**Confidence**: **{verify_res['confidence_score']}%**\n\n"
            f"**Analysis**: {verify_res['explanation']}\n\n"
            f"**Detected Indicators**:\n" +
            "\n".join([f"• {ind}" for ind in verify_res.get('indicators', [])[:3]])
        )

        return {
            "reply": reply,
            "detected_intent": "verification",
            "verification_card": {
                "prediction": verify_res["prediction"],
                "confidence_score": verify_res["confidence_score"],
                "explanation": verify_res["explanation"],
                "sources": verify_res.get("sources", [])
            }
        }

    # 2. Check Forensic Knowledge Base FAQ
    for item in FORENSIC_FAQ:
        if any(kw in msg_lower for kw in item["keywords"]):
            return {
                "reply": item["reply"],
                "detected_intent": "faq"
            }

    # 3. Friendly Forensic Assistant Default Response
    greeting_triggers = ["hi", "hello", "hey", "hola", "namaste", "start"]
    if any(msg_lower.startswith(g) for g in greeting_triggers):
        reply = (
            "👋 **Hello! I'm your TruthLens AI Chatbot**.\n\n"
            "I can assist you with:\n"
            "• **Instant Claim & News Verification**: Paste any headline or claim right here.\n"
            "• **Forensic Explanations**: Ask me about ELA, GAN face-swaps, or temporal video forensics.\n"
            "• **Platform Guidance**: Help you navigate our 4 forensic modules and PDF reports.\n\n"
            "What would you like to verify or learn about today?"
        )
        return {"reply": reply, "detected_intent": "greeting"}

    # Default Academic Response
    reply = (
        f"I received your inquiry regarding: *\"{user_msg[:80]}...\"*\n\n"
        "Here are recommended actions you can take:\n"
        "1. **Verify as a News Article**: Paste the full text in our **Fake News** module for linguistic TF-IDF analysis.\n"
        "2. **Check Official Citations**: Use our **Fact Verifier** module to cross-reference against trusted databases (WHO, Reuters, PIB, NASA).\n"
        "3. **Inspect Media**: If you have an image or video, upload it directly to **Image Forensics** or **Video Deepfake**.\n\n"
        "You can also ask me specific questions like *'How does ELA work?'* or *'How to detect video deepfakes?'*"
    )
    return {"reply": reply, "detected_intent": "general"}
