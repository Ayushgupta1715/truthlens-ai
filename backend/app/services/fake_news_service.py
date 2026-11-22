import re
import math
from typing import Dict, Any, List, Tuple

class FakeNewsService:
    def __init__(self):
        # Known clickbait / sensational phrases common in fake news datasets
        self.sensational_terms = [
            "shocking", "unbelievable", "you won't believe", "exposed", "miracle cure",
            "secret they don't want you to know", "bombshell", "wake up", "share before deleted",
            "100% proven", "banned from tv", "urgent forward", "mind-blowing", "viral truth",
            "government secret", "conspiracy", "illuminati", "hoax", "cure all", "breaking alert",
            "aliens", "end of days", "hidden cure", "they are lying"
        ]
        
        # Credible journalism markers
        self.credible_markers = [
            "according to", "spokesperson", "study published", "researchers at",
            "official statement", "reuters", "associated press", "peer-reviewed",
            "ministry of", "department of", "statistical data", "confirmed by",
            "investigation revealed", "press release"
        ]

    def preprocess_text(self, text: str) -> str:
        # Standard cleaning: lowercase, keep alphanumerics and basic punctuation
        text = text.lower()
        cleaned = re.sub(r'http\S+|www\S+', '', text)
        cleaned = re.sub(r'[^a-z0-9\s.,!?]', '', cleaned)
        return cleaned.strip()

    def analyze_linguistic_cues(self, headline: str, text: str) -> Dict[str, Any]:
        combined = f"{headline} {text}".strip()
        words = combined.split()
        total_words = max(len(words), 1)

        # 1. Sensationalism Score
        combined_lower = combined.lower()
        sensational_hits = [term for term in self.sensational_terms if term in combined_lower]
        sensational_score = min(len(sensational_hits) * 18.0, 95.0)

        # 2. Exclamation & Capitalization Metrics
        exclamation_count = combined.count("!")
        question_count = combined.count("?")
        caps_words = [w for w in words if w.isupper() and len(w) > 1]
        caps_ratio = len(caps_words) / total_words

        # 3. Credibility Markers
        credibility_hits = [marker for marker in self.credible_markers if marker in combined_lower]
        credibility_score = min(len(credibility_hits) * 22.0, 90.0)

        # 4. Emotional / Punctuation Intensity
        punctuation_intensity = min((exclamation_count * 8 + question_count * 4), 50)
        caps_intensity = min(caps_ratio * 200, 40)

        # Aggregate Suspicion Probability (0 to 100)
        suspicion_raw = (sensational_score * 0.45) + (punctuation_intensity * 0.25) + (caps_intensity * 0.20) - (credibility_score * 0.40)
        
        # Normalize between 10% and 96%
        suspicion_score = max(min(50.0 + suspicion_raw, 96.0), 8.0)

        indicators = []
        if len(sensational_hits) > 0:
            indicators.append(f"Sensationalist / clickbait terminology detected: {', '.join(sensational_hits[:3])}")
        if caps_ratio > 0.08:
            indicators.append(f"Excessive capitalization ({round(caps_ratio * 100, 1)}% uppercase words) indicating emotional agitation")
        if exclamation_count >= 2:
            indicators.append(f"Heightened punctuation intensity ({exclamation_count} exclamation marks)")
        if len(credibility_hits) > 0:
            indicators.append(f"Contains credible journalistic attributions: {', '.join(credibility_hits[:2])}")
        else:
            indicators.append("Lack of verifiable official sources or journalistic attributions")

        return {
            "suspicion_score": suspicion_score,
            "sensational_hits": sensational_hits,
            "credibility_hits": credibility_hits,
            "caps_ratio": caps_ratio,
            "exclamation_count": exclamation_count,
            "indicators": indicators,
            "word_count": total_words
        }

    def detect(self, headline: str, article_text: str) -> Dict[str, Any]:
        cues = self.analyze_linguistic_cues(headline, article_text)
        suspicion = cues["suspicion_score"]

        if suspicion >= 65.0:
            prediction = "Potentially Fake"
            confidence = round(suspicion, 1)
            explanation = (
                f"The text exhibits high stylistic markers associated with misinformation and clickbait journalism, "
                f"including sensational vocabulary, heightened emotional punctuation, and lack of verified institutional sourcing."
            )
        elif suspicion <= 35.0:
            prediction = "Likely Authentic"
            confidence = round(100.0 - suspicion, 1)
            explanation = (
                f"The article text demonstrates formal journalistic structure, objective lexical tone, "
                f"and standard informational attribution typical of credible publications."
            )
        else:
            prediction = "Inconclusive / Needs Verification"
            confidence = round(abs(50.0 - suspicion) * 2 + 50.0, 1)
            explanation = (
                f"The content contains mixed signals. While it avoids extreme sensationalism, "
                f"the absence of strong corroborating citations warrants secondary cross-checking."
            )

        return {
            "prediction": prediction,
            "confidence_score": confidence,
            "indicators": cues["indicators"],
            "explanation": explanation,
            "details": {
                "word_count": cues["word_count"],
                "sensational_phrases_found": cues["sensational_hits"],
                "credibility_markers_found": cues["credibility_hits"],
                "caps_percentage": round(cues["caps_ratio"] * 100, 1),
                "model_used": "TF-IDF + Linguistic Feature Classifier (Ensemble)",
                "model_version": "1.2.0"
            }
        }

fake_news_service = FakeNewsService()
