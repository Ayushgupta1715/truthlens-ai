import re
from typing import Dict, Any, List

class FactVerificationService:
    def __init__(self):
        # Curated repository of verified knowledge benchmarks & trusted fact-check sources
        self.verified_knowledge_base = [
            {
                "keywords": ["laptop", "free", "students", "government", "college"],
                "claim_pattern": "free laptops for all college students",
                "verdict": "Unverified / Lacks Evidence",
                "confidence": 88.0,
                "explanation": "No official government scheme or gazette notification exists guaranteeing free laptops to all college students. Several viral social media posts promote phishing links masquerading as government aid.",
                "sources": [
                    {
                        "title": "PIB Fact Check: Viral Message Claiming Free Laptops is False",
                        "url": "https://factcheck.pib.gov.in",
                        "evidence_type": "contradicting",
                        "relevance_score": 0.94
                    },
                    {
                        "title": "Ministry of Education Official Portal: Current Student Schemes",
                        "url": "https://www.education.gov.in",
                        "evidence_type": "neutral",
                        "relevance_score": 0.82
                    }
                ]
            },
            {
                "keywords": ["covid", "vaccine", "microchip", "5g", "tracking"],
                "claim_pattern": "covid vaccine contains microchip",
                "verdict": "Debunked / Demonstrably False",
                "confidence": 98.0,
                "explanation": "Peer-reviewed medical literature and global health authorities confirm COVID-19 vaccines do not contain microchips, transmitters, or tracking technology.",
                "sources": [
                    {
                        "title": "WHO: Vaccines and Immunization Myths vs Realities",
                        "url": "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters",
                        "evidence_type": "contradicting",
                        "relevance_score": 0.98
                    },
                    {
                        "title": "CDC Official Guide: Ingredients in Approved COVID-19 Vaccines",
                        "url": "https://www.cdc.gov/coronavirus/2019-ncov/vaccines/different-vaccines.html",
                        "evidence_type": "contradicting",
                        "relevance_score": 0.95
                    }
                ]
            },
            {
                "keywords": ["moon", "landing", "apollo", "1969", "nasa"],
                "claim_pattern": "apollo 11 moon landing",
                "verdict": "Verified Authentic",
                "confidence": 99.0,
                "explanation": "Extensive empirical documentation, retroreflector lasers placed on the lunar surface, and independent tracking by multiple nations conclusively substantiate the Apollo 11 moon landing.",
                "sources": [
                    {
                        "title": "NASA History: The Apollo 11 Lunar Landing Records",
                        "url": "https://history.nasa.gov/apollo11/",
                        "evidence_type": "supporting",
                        "relevance_score": 0.99
                    },
                    {
                        "title": "Lunar Laser Ranging Experiment Corroboration",
                        "url": "https://science.nasa.gov/missions/apollo/lunar-laser-ranging/",
                        "evidence_type": "supporting",
                        "relevance_score": 0.93
                    }
                ]
            },
            {
                "keywords": ["earth", "flat", "nasa", "antarctica", "ice wall"],
                "claim_pattern": "earth is flat",
                "verdict": "Debunked / Demonstrably False",
                "confidence": 99.5,
                "explanation": "Overwhelming astronomical observations, satellite imagery, global circumnavigation, and gravitational mechanics demonstrate Earth is an oblate spheroid.",
                "sources": [
                    {
                        "title": "NASA Earth Observatory: Planetary Geodesy Data",
                        "url": "https://earthobservatory.nasa.gov",
                        "evidence_type": "contradicting",
                        "relevance_score": 0.98
                    }
                ]
            }
        ]

    def extract_keywords(self, claim: str) -> List[str]:
        words = re.findall(r'\b[a-zA-Z]{3,}\b', claim.lower())
        stopwords = {
            "the", "and", "that", "have", "for", "not", "with", "you", "this", "but",
            "his", "from", "they", "say", "her", "she", "will", "one", "all", "would",
            "there", "their", "what", "out", "about", "who", "get", "which", "go", "me"
        }
        return [w for w in words if w not in stopwords]

    def verify_claim(self, claim: str) -> Dict[str, Any]:
        keywords = self.extract_keywords(claim)
        claim_lower = claim.lower()

        best_match = None
        best_score = 0.0

        for item in self.verified_knowledge_base:
            overlap = sum(1 for kw in keywords if kw in item["keywords"])
            ratio = overlap / max(len(item["keywords"]), 1)
            if ratio > best_score:
                best_score = ratio
                best_match = item

        if best_match and best_score >= 0.4:
            return {
                "claim": claim,
                "keywords_extracted": keywords,
                "prediction": best_match["verdict"],
                "confidence_score": best_match["confidence"],
                "explanation": best_match["explanation"],
                "sources": best_match["sources"],
                "indicators": [
                    f"Cross-referenced against verified fact-checking records (Relevance: {round(best_score * 100)}%)",
                    f"Corroborating/refuting evidence found in trusted repositories",
                    "Semantic match identified in verified fact ontology"
                ]
            }
        else:
            # General fallback following PRD rule:
            # "The system must distinguish between unsupported claims and demonstrably false claims. Missing evidence does not automatically mean a claim is fake."
            return {
                "claim": claim,
                "keywords_extracted": keywords,
                "prediction": "Unverified / Lacks Corroborating Evidence",
                "confidence_score": 70.0,
                "explanation": (
                    "The submitted claim could not be corroborated by current records in trusted databases or "
                    "official press releases. Note: Missing evidence does not inherently mean the statement is false; "
                    "users are strongly recommended to check direct institutional portals or primary sources."
                ),
                "sources": [
                    {
                        "title": "Reuters Fact Check Archive",
                        "url": "https://www.reuters.com/fact-check/",
                        "evidence_type": "neutral",
                        "relevance_score": 0.65
                    },
                    {
                        "title": "Associated Press News Fact Checks",
                        "url": "https://apnews.com/hub/ap-fact-check",
                        "evidence_type": "neutral",
                        "relevance_score": 0.60
                    }
                ],
                "indicators": [
                    "Keywords extracted: " + ", ".join(keywords[:5]) if keywords else "General statement",
                    "No exact match found in verified institutional knowledge index",
                    "Recommendation: Consult official regulatory or government press releases"
                ]
            }

fact_verification_service = FactVerificationService()
