# PRODUCT REQUIREMENTS DOCUMENT (PRD)

# TRUTHLENS AI
## AI-Powered Fake News & Deepfake Detection Platform

**Version:** 1.0  
**Project Type:** Academic Mini Project  
**Department:** Computer Science & Engineering (Artificial Intelligence & Data Science)  
**Development Duration:** 6–8 Weeks

---

# 1. PROJECT OVERVIEW

## 1.1 Introduction
TruthLens AI is an AI-powered digital media verification platform designed to detect fake news, AI-generated images, manipulated photographs and deepfake videos.

The platform uses Machine Learning, Natural Language Processing (NLP), Deep Learning and Computer Vision to analyse digital content and provide authenticity predictions.

Users can upload images, videos or submit news articles and claims to receive an AI-generated analysis report.

The platform also provides confidence scores, suspicious indicators and explainable results to help users understand why particular content may be misleading or manipulated.

## 1.2 Vision
To build an intelligent platform that helps people identify misleading information and manipulated digital media before believing or sharing it.

## 1.3 Mission
- Reduce the spread of misinformation.
- Detect AI-generated and manipulated media.
- Make digital content verification accessible.
- Provide explainable AI-based predictions.
- Promote responsible digital information consumption.

---

# 2. PROBLEM STATEMENT
With the rapid development of Artificial Intelligence, creating realistic fake news, manipulated images and deepfake videos has become easier. Social media users frequently encounter misleading articles, fabricated claims and manipulated videos. Most users cannot independently determine whether digital content is authentic. Existing detection tools often focus on only one type of content, making verification difficult across different media formats.

Therefore, TruthLens AI aims to provide a unified platform that analyses news text, images and videos using AI and Machine Learning technologies.

---

# 3. PROJECT OBJECTIVES
1. Develop an ML-based fake news detection system.
2. Build a deep learning model for image manipulation detection.
3. Implement deepfake video analysis.
4. Develop an AI-based claim verification system.
5. Generate understandable analysis reports.
6. Provide confidence scores and suspicious indicators.
7. Maintain user scan history.
8. Develop an interactive analytics dashboard.

---

# 4. TARGET USERS
| User Type | Requirements |
|---|---|
| Students | Verify news and digital media |
| General Users | Identify suspicious content |
| Journalists | Perform preliminary media verification |
| Researchers | Analyse misinformation patterns |
| Administrators | Monitor platform activity |

---

# 5. CORE MODULES

## MODULE 1: FAKE NEWS DETECTION
- **Description:** Analyses news headlines, articles and text to identify potentially misleading or fabricated information.
- **Workflow:** User pastes headline/article -> Preprocessing -> NLP + TF-IDF extraction -> Classifier -> Prediction + Indicators + Explanations.
- **Technologies:** NLP, TF-IDF, Logistic Regression, Random Forest, NLTK.

## MODULE 2: DEEPFAKE IMAGE DETECTION
- **Description:** Analyses uploaded images (JPG, JPEG, PNG) to detect AI-generated artifacts, face tampering, and blending boundaries.
- **Workflow:** Image upload & validation -> Preprocessing -> Face/artifact analysis -> CNN / EfficientNet -> Prediction + Indicators.
- **Technologies:** OpenCV, PyTorch / Torchvision, CNN / Transfer Learning, Face Detection (Haar / MTCNN / MediaPipe).

## MODULE 3: DEEPFAKE VIDEO DETECTION
- **Description:** Analyses uploaded MP4 videos for facial manipulation and temporal deepfake artifacts.
- **Workflow:** Video Upload -> Frame Extraction -> Face Detection -> Frame-wise Classification -> Timeline Aggregation -> Final Report.
- **Technologies:** OpenCV, PyTorch, FFmpeg / Video frame analysis.

## MODULE 4: AI FACT VERIFICATION
- **Description:** Checks user-submitted claims against relevant trusted facts and knowledge sources.
- **Workflow:** Claim input -> Keyword & Entity Extraction -> Source Evidence Retrieval -> Semantic Comparison -> Supporting/Contradicting classification.
- **Technologies:** NLP, Semantic Similarity, RAG / Evidence matching.

---

# 6. PLATFORM FEATURES
- **User Authentication:** Registration, Login, JWT tokens, bcrypt password hashing.
- **User Dashboard:** Stats (total scans, breakdown by type, fake vs authentic distribution, recent activity timeline).
- **Scan History:** Filterable history, detailed inspection, deletion.
- **Report Generation:** Downloadable PDF reports with scan summary, scores, indicators, and model metrics.
- **Admin Dashboard:** Platform-level statistics, user analytics, model accuracy/precision/recall benchmarks.

---

# 7. TECH STACK
- **Frontend:** React.js + Tailwind CSS + Lucide Icons + Recharts
- **Backend:** Python FastAPI + Pydantic + Uvicorn
- **Database:** SQLite (default for development/portable demo) / PostgreSQL (production-ready via SQLAlchemy)
- **ML / NLP / CV:** Scikit-learn, PyTorch, OpenCV, NLTK, ReportLab
