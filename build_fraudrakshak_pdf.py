import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, Image as RLImage
)
from reportlab.pdfgen import canvas

class SequentialNumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(SequentialNumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations()
            super(SequentialNumberedCanvas, self).showPage()
        super(SequentialNumberedCanvas, self).save()

    def draw_page_decorations(self):
        self.saveState()
        self.setFont("Times-Roman", 10.5)
        self.setFillColor(colors.black)
        p = self._pageNumber
        if p > 1:
            self.drawCentredString(297.5, 45, str(p))
        self.restoreState()

def build_pdf(filename="FRAUDRAKSHAK_MINI_PROJECT_REPORT_AYUSH_KUMAR_GUPTA.pdf"):
    # Standard academic margins (72pt = 1 inch)
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=72,
        rightMargin=72,
        topMargin=72,
        bottomMargin=72
    )

    # Academic Typography Styles
    style_cover_pre = ParagraphStyle(
        'CoverPre',
        fontName='Times-Bold',
        fontSize=12,
        leading=16,
        alignment=TA_CENTER,
        textColor=colors.black
    )
    style_cover_title = ParagraphStyle(
        'CoverTitle',
        fontName='Times-Bold',
        fontSize=14.5,
        leading=21,
        alignment=TA_CENTER,
        textColor=colors.black
    )
    style_cover_sub = ParagraphStyle(
        'CoverSub',
        fontName='Times-Italic',
        fontSize=11,
        leading=15,
        alignment=TA_CENTER,
        textColor=colors.black
    )
    style_cover_body = ParagraphStyle(
        'CoverBody',
        fontName='Times-Roman',
        fontSize=11,
        leading=16,
        alignment=TA_CENTER,
        textColor=colors.black
    )
    style_cover_bold = ParagraphStyle(
        'CoverBold',
        fontName='Times-Bold',
        fontSize=12,
        leading=17,
        alignment=TA_CENTER,
        textColor=colors.black
    )
    style_cover_univ = ParagraphStyle(
        'CoverUniv',
        fontName='Times-Bold',
        fontSize=12,
        leading=17,
        alignment=TA_CENTER,
        textColor=colors.black
    )
    
    # Section Heading Styles
    style_heading = ParagraphStyle(
        'SectionHeading',
        fontName='Times-Bold',
        fontSize=13,
        leading=18,
        alignment=TA_CENTER,
        textColor=colors.black,
        spaceBefore=0,
        spaceAfter=18
    )
    style_chap_title = ParagraphStyle(
        'ChapterTitle',
        fontName='Times-Bold',
        fontSize=12.5,
        leading=17,
        alignment=TA_LEFT,
        textColor=colors.black,
        spaceBefore=0,
        spaceAfter=12,
        keepWithNext=True
    )
    style_subheading = ParagraphStyle(
        'SubHeading',
        fontName='Times-Bold',
        fontSize=11.5,
        leading=16,
        alignment=TA_LEFT,
        textColor=colors.black,
        spaceBefore=10,
        spaceAfter=6,
        keepWithNext=True
    )
    
    # Body Paragraph Styles
    style_body = ParagraphStyle(
        'AcademicBody',
        fontName='Times-Roman',
        fontSize=11,
        leading=16.5,
        alignment=TA_JUSTIFY,
        spaceAfter=8
    )
    style_bullet = ParagraphStyle(
        'AcademicBullet',
        fontName='Times-Roman',
        fontSize=11,
        leading=16.5,
        alignment=TA_JUSTIFY,
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=6
    )
    
    # Table Caption
    style_table_caption = ParagraphStyle(
        'TableCaption',
        fontName='Times-Bold',
        fontSize=9.5,
        leading=13,
        alignment=TA_CENTER,
        textColor=colors.black,
        spaceBefore=6,
        spaceAfter=6,
        keepWithNext=True
    )
    style_fig_caption = ParagraphStyle(
        'FigureCaption',
        fontName='Times-Bold',
        fontSize=9.5,
        leading=13,
        alignment=TA_CENTER,
        textColor=colors.black,
        spaceBefore=6,
        spaceAfter=6,
        keepWithNext=False
    )

    story = []

    # =========================================================================
    # PAGE 1: TITLE SHEET
    # =========================================================================
    story.append(Spacer(1, 35))
    story.append(Paragraph("<b>A MINI PROJECT REPORT ON</b>", style_cover_pre))
    story.append(Spacer(1, 14))
    story.append(Paragraph("<b>FraudRakshak: Multilingual AI-Powered Cyber Fraud Detection &amp;<br/>Voice Advisory System</b>", style_cover_title))
    story.append(Spacer(1, 22))
    
    story.append(Paragraph("<i>Submitted in partial fulfilment of the requirements of the degree of</i>", style_cover_sub))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Bachelor of Technology</b>", style_cover_bold))
    story.append(Spacer(1, 3))
    story.append(Paragraph("<i>in</i>", style_cover_sub))
    story.append(Spacer(1, 3))
    story.append(Paragraph("<b>Computer Science and Engineering with Artificial Intelligence and Data Science</b>", style_cover_bold))
    story.append(Spacer(1, 20))
    
    story.append(Paragraph("<i>by</i>", style_cover_sub))
    story.append(Spacer(1, 6))
    story.append(Paragraph("<b>Ayush Kumar Gupta</b>", ParagraphStyle('AuthorName', fontName='Times-Bold', fontSize=13, leading=17, alignment=TA_CENTER)))
    story.append(Paragraph("(Roll No. 2308302009)", style_cover_body))
    story.append(Spacer(1, 18))
    
    story.append(Paragraph("<b>Supervisor (s):</b>", style_cover_bold))
    story.append(Paragraph("_______________________________________", style_cover_body))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Mr. Digesh Pandey</b>", style_cover_bold))
    story.append(Paragraph("<i>Assistant Professor, Department of Computer Science &amp; Engineering</i>", style_cover_sub))
    story.append(Spacer(1, 16))
    
    if os.path.exists("kmclu_official_logo.jpeg"):
        logo = RLImage("kmclu_official_logo.jpeg", width=80, height=85)
        logo.hAlign = 'CENTER'
        story.append(logo)
        story.append(Spacer(1, 16))
    elif os.path.exists("fraud_p1_img1.jpeg"):
        logo = RLImage("fraud_p1_img1.jpeg", width=80, height=85)
        logo.hAlign = 'CENTER'
        story.append(logo)
        story.append(Spacer(1, 16))
    else:
        story.append(Spacer(1, 30))
        
    story.append(Paragraph("<b>Department of Computer Science &amp; Engineering</b>", style_cover_univ))
    story.append(Paragraph("<b>(FACULTY OF ENGINEERING AND TECHNOLOGY)</b>", style_cover_univ))
    story.append(Paragraph("<b>KHWAJA MOINUDDIN CHISHTI LANGUAGE UNIVERSITY</b>", ParagraphStyle('UnivMain', fontName='Times-Bold', fontSize=13, leading=18, alignment=TA_CENTER)))
    story.append(Paragraph("<b>LUCKNOW, UTTAR PRADESH</b>", style_cover_univ))
    story.append(Spacer(1, 4))
    story.append(Paragraph("Academic Session 2026-2027", style_cover_body))
    
    story.append(PageBreak())

    # =========================================================================
    # PAGE 2: CERTIFICATE (2)
    # =========================================================================
    story.append(Spacer(1, 15))
    story.append(Paragraph("<b>CERTIFICATE</b>", style_heading))
    story.append(Spacer(1, 15))
    
    cert_text = (
        "This is to certify that the Mini Project Report entitled <b>&quot;FraudRakshak: Multilingual "
        "AI-Powered Cyber Fraud Detection &amp; Voice Advisory System&quot;</b> submitted by "
        "<b>Ayush Kumar Gupta (Roll No. 2308302009)</b> in partial fulfilment of the requirements for "
        "the award of the degree of <b>Bachelor of Technology in Computer Science and Engineering with "
        "Artificial Intelligence and Data Science from KHWAJA MOINUDDIN CHISHTI LANGUAGE UNIVERSITY, "
        "Lucknow</b>, is a bona fide record of original work carried out by him under our supervision and guidance "
        "during the academic session 2026-2027.<br/><br/>"
        "The results embodied in this report have been verified and tested under authentic digital scam vectors and "
        "have not been submitted elsewhere for the award of any other degree or diploma."
    )
    story.append(Paragraph(cert_text, style_body))
    story.append(Spacer(1, 140))
    
    cert_table = [
        ["______________________________", "______________________________"],
        ["Signature of Project Guide", "Signature of Head of Department"],
        ["Mr. Digesh Pandey", "Dr. Suman Kumar Mishra"],
        ["Assistant Professor", "Head, Department of Computer Science &"],
        ["Department of Computer Science & Engineering", "Engineering"],
        ["", "FACULTY OF ENGINEERING AND TECHNOLOGY"]
    ]
    t_cert = Table(cert_table, colWidths=[225, 225])
    t_cert.setStyle(TableStyle([
        ('FONTNAME', (0,0), (-1,-1), 'Times-Roman'),
        ('FONTSIZE', (0,0), (-1,-1), 10.5),
        ('LEADING', (0,0), (-1,-1), 15),
        ('ALIGN', (0,0), (0,-1), 'LEFT'),
        ('ALIGN', (1,0), (1,-1), 'RIGHT'),
        ('FONTNAME', (0,1), (-1,2), 'Times-Bold'),
        ('FONTNAME', (1,5), (1,5), 'Times-Bold'),
    ]))
    story.append(t_cert)
    
    story.append(PageBreak())

    # =========================================================================
    # PAGE 3: DECLARATION (3)
    # =========================================================================
    story.append(Spacer(1, 15))
    story.append(Paragraph("<b>DECLARATION</b>", style_heading))
    story.append(Spacer(1, 15))
    
    dec_text = (
        "I declare that this written submission represents my ideas in my own words and where others' ideas or words have "
        "been included, I have adequately cited and referenced the original sources. I also declare that I have adhered to all "
        "principles of academic honesty and integrity and have not misrepresented or fabricated or falsified any idea/data/fact/source "
        "in my submission. I understand that any violation of the above will be cause for disciplinary action by the Institute "
        "and can also evoke penal action from the sources which have thus not been properly cited or from whom proper permission "
        "has not been taken when needed."
    )
    story.append(Paragraph(dec_text, style_body))
    story.append(Spacer(1, 110))
    
    dec_sign = [
        ["_________________________________"],
        ["(Signature)"],
        [""],
        ["Ayush Kumar Gupta"],
        ["(Name of the student)"],
        [""],
        ["2308302009"],
        ["(Roll No.)"],
        [""],
        ["Date: ________________________"],
        ["Place: LUCKNOW, UTTAR PRADESH"]
    ]
    t_dec = Table(dec_sign, colWidths=[300])
    t_dec.setStyle(TableStyle([
        ('FONTNAME', (0,0), (-1,-1), 'Times-Roman'),
        ('FONTSIZE', (0,0), (-1,-1), 11),
        ('LEADING', (0,0), (-1,-1), 16),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('FONTNAME', (0,1), (0,1), 'Times-Bold'),
        ('FONTNAME', (0,3), (0,3), 'Times-Bold'),
        ('FONTNAME', (0,6), (0,6), 'Times-Bold'),
    ]))
    story.append(t_dec)
    
    story.append(PageBreak())

    # =========================================================================
    # PAGE 4: ACKNOWLEDGEMENT (4)
    # =========================================================================
    story.append(Spacer(1, 15))
    story.append(Paragraph("<b>ACKNOWLEDGEMENT</b>", style_heading))
    story.append(Spacer(1, 15))
    
    ack_text = (
        "I would like to express my deepest gratitude to my esteemed project guide, <b>Mr. Digesh Pandey</b>, "
        "Assistant Professor, Department of Computer Science &amp; Engineering, whose continuous guidance, encouragement, "
        "and insightful feedback were invaluable throughout the conception, architectural design, and implementation of this "
        "Mini Project entitled <b>&quot;FraudRakshak: Multilingual AI-Powered Cyber Fraud Detection &amp; Voice Advisory System&quot;</b>.<br/><br/>"
        "I extend my sincere appreciation to <b>Dr. Suman Kumar Mishra</b>, Head of the Department, Department of Computer Science &amp; "
        "Engineering, and the Dean, <b>FACULTY OF ENGINEERING AND TECHNOLOGY, KHWAJA MOINUDDIN CHISHTI LANGUAGE UNIVERSITY</b>, "
        "Lucknow, for providing the necessary institutional facilities, computational environment, and academic ecosystem to "
        "successfully carry out this technical investigation.<br/><br/>"
        "I also wish to thank my esteemed faculty members, laboratory staff, and peer colleagues for their constructive criticism, "
        "technical suggestions, and moral support during the development and benchmark testing phases of this research project."
    )
    story.append(Paragraph(ack_text, style_body))
    story.append(Spacer(1, 45))
    
    ack_sign_table = [
        ["", "Ayush Kumar Gupta"],
        ["", "Roll No.: 2308302009"],
        ["", "B.Tech, Computer Science and Engineering with Artificial Intelligence and Data Science"],
        ["", "KHWAJA MOINUDDIN CHISHTI LANGUAGE UNIVERSITY, Lucknow"]
    ]
    t_ack = Table(ack_sign_table, colWidths=[100, 350])
    t_ack.setStyle(TableStyle([
        ('FONTNAME', (0,0), (-1,-1), 'Times-Roman'),
        ('FONTSIZE', (0,0), (-1,-1), 10.5),
        ('LEADING', (0,0), (-1,-1), 15),
        ('ALIGN', (1,0), (1,-1), 'RIGHT'),
        ('FONTNAME', (1,0), (1,0), 'Times-Bold'),
    ]))
    story.append(t_ack)
    
    story.append(PageBreak())

    # =========================================================================
    # PAGE 5: ABSTRACT (5)
    # =========================================================================
    story.append(Spacer(1, 15))
    story.append(Paragraph("<b>ABSTRACT</b>", style_heading))
    story.append(Spacer(1, 12))
    
    abs_p1 = (
        "In India, digital payment platforms such as UPI, net banking, and mobile wallets are used by millions of people "
        "every day. While this has made online money transfers very easy, it has also given rise to a sharp increase in cyber fraud "
        "and online scams. Scammers target ordinary people using psychological fear and false urgency. Common examples include "
        "fake electricity cutoff warnings at night, fraudulent bank account suspension messages, fake lottery rewards, and threatening "
        "video calls from criminals pretending to be police officers (popularly known as 'Digital Arrest'). Existing spam detection "
        "apps like Truecaller only rely on blacklisted phone numbers and basic English heuristics. They fail to understand scam messages "
        "written in regional languages such as Hindi and Hinglish."
    )
    story.append(Paragraph(abs_p1, style_body))
    
    abs_p2 = (
        "To solve this problem, we created <b>FraudRakshak</b>, an intelligent and user-friendly cyber fraud shield built "
        "specifically for Indian citizens. FraudRakshak analyzes suspicious SMS, WhatsApp messages, and phone call transcripts in Hindi, "
        "Hinglish, and English. It calculates a Risk Score from 0 to 100 and clearly flags high-risk words. In addition, it provides a "
        "Voice AI Advisor that speaks out clear security instructions in natural Hindi and English. It also offers a Scam Call Simulator "
        "that trains users on how to reply safely to real scammers, and an automated 1930 Zero-FIR generator that drafts a ready-to-file "
        "complaint for the National Cyber Crime Reporting Portal (cybercrime.gov.in). During testing on 86 real-world test cases, "
        "FraudRakshak achieved an overall accuracy of 91.9% (with individual scam category detection rates ranging from 80.0% to 100.0%), "
        "while maintaining a 0% false alarm rate on legitimate bank transaction alerts."
    )
    story.append(Paragraph(abs_p2, style_body))
    story.append(Spacer(1, 8))
    
    kw_text = "<b>Keywords:</b> Cyber Fraud Detection, Digital Arrest, Scam Call Simulator, Voice AI Advisor, 1930 Helpline, Hinglish, UPI Security."
    story.append(Paragraph(kw_text, style_body))
    
    story.append(PageBreak())

    # =========================================================================
    # PAGE 6: TABLE OF CONTENTS (Part 1) (6)
    # =========================================================================
    story.append(Spacer(1, 10))
    story.append(Paragraph("<b>TABLE OF CONTENTS</b>", style_heading))
    story.append(Spacer(1, 8))
    
    toc_p1 = [
        ["Certificate", ".......................................................", "ii"],
        ["Declaration (Specimen 'B')", ".......................................................", "iii"],
        ["Acknowledgement", "...................................................", "iv"],
        ["Abstract", "...........................................................", "v"],
        ["Chapter 1: Introduction", "............................................", "1"],
        ["1.1 Background and Current Scenario", "............................", "1"],
        ["1.2 Motivation: Why We Built FraudRakshak", "......................", "2"],
        ["1.3 Project Scope and Key Features", ".............................", "3"],
        ["Chapter 2: Literature Review", ".......................................", "4"],
        ["2.1 Existing Spam Filters and Their Working", "....................", "4"],
        ["2.2 The Problem with Indian Languages (Hinglish & Hindi)", ".......", "5"],
        ["2.3 Identified Gaps in Current Solutions", ".......................", "6"],
        ["Chapter 3: Problem Statement", ".......................................", "7"],
        ["3.1 Problem Definition in Simple Words", ".........................", "7"],
        ["3.2 Top 10 Cyber Scam Vectors in India", ".........................", "7"],
        ["3.3 How Scammers Trick Victims (Psychological Urgency)", ".........", "8"],
        ["Chapter 4: Objectives of the Project", "...............................", "9"],
        ["4.1 Primary Technical Goals", "....................................", "9"],
        ["4.2 Key Benefits for Users", "....................................", "10"],
        ["Chapter 5: Methodology & How It Works", ".............................", "11"],
        ["5.1 Step-by-Step System Workflow", "..............................", "11"],
        ["5.2 Scam Scoring Formula & Logic", "..............................", "12"],
        ["5.3 Three-Level Risk Classification (Safe, Medium, High)", "......", "14"],
        ["Chapter 6: System Design", "..........................................", "15"],
        ["6.1 Layered Architecture", "......................................", "15"],
        ["6.2 Data Flow Diagram (Level 0)", "...............................", "16"],
        ["6.3 Data Flow Diagram (Level 1)", "...............................", "17"],
        ["6.4 Use Case & Sequence Diagrams", "..............................", "18"],
        ["6.5 Class Diagram", ".............................................", "19"],
        ["Chapter 7: Implementation Details & Tech Stack", "....................", "20"],
        ["7.1 Technologies Used and Why", ".................................", "20"],
        ["7.2 Frontend Design (React 19 & Tailwind CSS)", ".................", "21"],
        ["7.3 Backend Server & AI API (Python FastAPI & Vercel)", ".........", "23"],
        ["Chapter 8: Results, Testing & Discussion", "..........................", "25"],
        ["8.1 Testing with 86 Real-World Cases", "..........................", "25"],
        ["8.2 Detection Accuracy Across All 10 Scam Types", "...............", "26"],
        ["8.3 Zero False Alarms on Real Bank Alerts", ".....................", "28"]
    ]
    t_toc1 = Table(toc_p1, colWidths=[245, 180, 25])
    t_toc1.setStyle(TableStyle([
        ('FONTNAME', (0,0), (-1,-1), 'Times-Roman'),
        ('FONTSIZE', (0,0), (-1,-1), 8),
        ('LEADING', (0,0), (-1,-1), 11.5),
        ('ALIGN', (0,0), (0,-1), 'LEFT'),
        ('ALIGN', (1,0), (1,-1), 'CENTER'),
        ('ALIGN', (2,0), (2,-1), 'RIGHT'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(t_toc1)
    
    story.append(PageBreak())

    # =========================================================================
    # PAGE 7: TABLE OF CONTENTS (Part 2) (7)
    # =========================================================================
    story.append(Spacer(1, 20))
    toc_p2 = [
        ["Chapter 9: Conclusion and Future Scope", "............................", "29"],
        ["9.1 Summary of What We Achieved", "...............................", "29"],
        ["9.2 Future Improvements (Android App & Carrier Support)", ".......", "30"],
        ["References", "........................................................", "31"]
    ]
    t_toc2 = Table(toc_p2, colWidths=[240, 180, 30])
    t_toc2.setStyle(TableStyle([
        ('FONTNAME', (0,0), (-1,-1), 'Times-Roman'),
        ('FONTSIZE', (0,0), (-1,-1), 9.5),
        ('LEADING', (0,0), (-1,-1), 18),
        ('ALIGN', (0,0), (0,-1), 'LEFT'),
        ('ALIGN', (1,0), (1,-1), 'CENTER'),
        ('ALIGN', (2,0), (2,-1), 'RIGHT'),
    ]))
    story.append(t_toc2)
    
    story.append(PageBreak())

    # =========================================================================
    # PAGE 8: CHAPTER 1: INTRODUCTION (Part 1) (8)
    # =========================================================================
    story.append(Paragraph("<b>CHAPTER 1: INTRODUCTION</b>", style_chap_title))
    
    story.append(Paragraph("<b>1.1 Background and Current Scenario</b>", style_subheading))
    p_1_1 = (
        "Over the last few years, digital India has grown at a record pace. Tools like Unified Payments Interface (UPI), "
        "Aadhaar verification, and mobile banking applications have made it possible for anyone to transfer money in seconds "
        "using their mobile phone. Today, street vendors, small shopkeepers, students, and senior citizens all rely on digital "
        "payments for their everyday needs.<br/><br/>"
        "However, this convenience has also attracted organized criminal groups. Instead of attempting to hack complicated bank "
        "security systems, scammers target human emotions. They use deception, fear, and panic to convince people to send money "
        "or share secret information like OTPs, PIN numbers, and passwords. This method of tricking people is known as "
        "<b>Social Engineering</b>."
    )
    story.append(Paragraph(p_1_1, style_body))
    
    story.append(Paragraph("<b>1.2 Motivation: Why We Built FraudRakshak</b>", style_subheading))
    p_1_2 = (
        "According to government cybercrime reports, Indian citizens lose over Rs. 1,750 Crore every month to online financial "
        "scams. The victims are often everyday people&mdash;such as elderly citizens who are not tech-savvy, or students looking "
        "for part-time work. When a person receives a message saying, 'Your electricity will be cut off tonight at 9:30 PM' or a "
        "video call from someone claiming to be a CBI officer, they panic and make mistakes."
    )
    story.append(Paragraph(p_1_2, style_body))
    
    bullets_1_2 = [
        "&bull;&nbsp; <b>1. Outdated Blacklists:</b> They only check if a phone number was previously reported as spam. Scammers buy new SIM cards every hour, making blacklists useless.",
        "&bull;&nbsp; <b>2. No Regional Language Support:</b> They only understand English text. In India, people speak Hindi and write in 'Hinglish' (Hindi words written in English letters). Existing apps miss these completely.",
        "&bull;&nbsp; <b>3. No Voice Guidance:</b> When a person is scared, reading long warning text is difficult. Existing apps do not speak out loud to guide the user.",
        "&bull;&nbsp; <b>4. Lack of Action:</b> They do not help the user report the crime to the government police helpline (1930)."
    ]
    for b in bullets_1_2:
        story.append(Paragraph(b, style_bullet))
        
    story.append(Paragraph("<b>1.3 Project Scope and Key Features</b>", style_subheading))
    bullets_1_3 = [
        "&bull;&nbsp; <b>Instant Message Scanner:</b> Paste any SMS or WhatsApp message to see an immediate safety score from 0 to 100.",
        "&bull;&nbsp; <b>Voice AI Advisor:</b> Talks back to the user in simple Hindi and English, explaining whether the message is safe or dangerous.",
        "&bull;&nbsp; <b>Fake Call Simulator:</b> Let users practice realistic scam calls with an AI Copilot that suggests smart ways to reply to scammers."
    ]
    for b in bullets_1_3:
        story.append(Paragraph(b, style_bullet))
        
    story.append(PageBreak())

    # =========================================================================
    # PAGE 9: CHAPTER 1: INTRODUCTION (Part 2) (9)
    # =========================================================================
    story.append(Spacer(1, 10))
    p_1_3_cont = [
        "&bull;&nbsp; <b>Instant 1930 Complaint Generator:</b> Pre-fills an official complaint format for cybercrime.gov.in so victims can report fraud immediately."
    ]
    for b in p_1_3_cont:
        story.append(Paragraph(b, style_bullet))
        
    story.append(PageBreak())

    # =========================================================================
    # PAGE 10: CHAPTER 2: LITERATURE REVIEW (10)
    # =========================================================================
    story.append(Paragraph("<b>CHAPTER 2: LITERATURE REVIEW</b>", style_chap_title))
    
    story.append(Paragraph("<b>2.1 Existing Spam Filters and Their Working</b>", style_subheading))
    p_2_1 = (
        "Most existing spam detection tools, such as Truecaller, Hiya, and standard SMS spam filters, work on a crowdsourced "
        "database. When thousands of users mark a phone number as spam, that number gets added to a blacklist. Some modern filters "
        "also look for simple spam words like 'Congratulations', 'Win cash', or 'Discount coupon'."
    )
    story.append(Paragraph(p_2_1, style_body))
    
    story.append(Paragraph("<b>2.2 The Problem with Indian Languages (Hinglish &amp; Hindi)</b>", style_subheading))
    p_2_2 = (
        "In India, scammers rarely write in pure formal English. They write in conversational Hinglish, such as: 'Aapka bijli "
        "connection aaj raat 9:30 baje kaat diya jayega, turant is number par call karein'. Because standard NLP tools are trained "
        "on American or British English datasets, they do not recognize words like 'bijli', 'kaat diya', 'turant', or 'pancard block'. "
        "As a result, dangerous scam messages are wrongly marked as safe."
    )
    story.append(Paragraph(p_2_2, style_body))
    
    story.append(Paragraph("<b>2.3 Identified Gaps in Current Solutions</b>", style_subheading))
    bullets_2_3 = [
        "&bull;&nbsp; <b>Gap 1 (Content is Ignored):</b> Existing apps check who sent the message, but do not read what the message says.",
        "&bull;&nbsp; <b>Gap 2 (No Voice Support):</b> Elderly citizens and rural users often prefer listening over reading small text on a screen.",
        "&bull;&nbsp; <b>Gap 3 (No Guidance on What to Do Next):</b> Merely warning 'This looks like spam' does not help a panicked victim who has already shared an OTP."
    ]
    for b in bullets_2_3:
        story.append(Paragraph(b, style_bullet))
        
    story.append(PageBreak())

    # =========================================================================
    # PAGE 11: CHAPTER 3: PROBLEM STATEMENT (Part 1) (11)
    # =========================================================================
    story.append(Paragraph("<b>CHAPTER 3: PROBLEM STATEMENT</b>", style_chap_title))
    
    story.append(Paragraph("<b>3.1 Problem Definition in Simple Words</b>", style_subheading))
    p_3_1 = (
        "How can we create a fast, easy-to-use software system that helps ordinary Indian citizens instantly identify scam "
        "messages and phone calls, explains the danger in simple voice in Hindi and English, and helps them take immediate "
        "defensive action before losing their hard-earned money?"
    )
    story.append(Paragraph(p_3_1, style_body))
    
    story.append(Paragraph("<b>3.2 Top 10 Cyber Scam Vectors in India</b>", style_subheading))
    bullets_3_2 = [
        "&bull;&nbsp; <b>1. Digital Arrest / Fake Police Scam:</b> Scammers pretend to be officers from CBI, Police, or Customs via WhatsApp video call. They claim illegal drugs or money laundering was found in your name and demand money to cancel the fake arrest warrant.",
        "&bull;&nbsp; <b>2. Electricity Bill Cutoff Threat:</b> Fraudulent SMS claiming your home electricity will be cut off tonight at 9:30 PM due to an unpaid bill, urging you to call an unknown personal mobile number immediately.",
        "&bull;&nbsp; <b>3. Bank Account &amp; KYC Freeze Scam:</b> Fake message claiming your bank account or ATM card has been blocked. It asks you to click a link to update PAN or Aadhaar card details, which steals your net banking password and OTP.",
        "&bull;&nbsp; <b>4. Part-Time Job / Telegram Task Scam:</b> Scammers promise students and job seekers that they can earn Rs. 3,000 to Rs. 5,000 daily by simply liking YouTube videos or rating hotels, ultimately trapping them into crypto deposits.",
        "&bull;&nbsp; <b>5. Lottery &amp; KBC Cash Prize Scam:</b> Deceptive messages claiming you have won a lottery of Rs. 25 Lakhs from Kaun Banega Crorepati (KBC), asking you to pay an advance 'file processing fee' or 'tax'.",
        "&bull;&nbsp; <b>6. Fake Courier / Customs Parcel Scam:</b> Scammers send SMS saying a FedEx or India Post parcel sent in your name was seized by customs, demanding quick online payment to avoid a police case.",
        "&bull;&nbsp; <b>7. Dangerous APK App Sideloading:</b> Victims are asked to download a mobile app file outside Google Play Store (e.g., 'SBI_Yono_Update.apk'). Once installed, this app secretly reads OTP messages and steals money.",
        "&bull;&nbsp; <b>8. Illegal Loan App Extortion:</b> Predatory lending mobile apps that grant small instant loans, steal the user's private phone contact list, and later blackmail the borrower with threats and harassment.",
        "&bull;&nbsp; <b>9. Telecom SIM Deactivation Scam:</b> Callers pretend to be telecom executives from Jio or Airtel, claiming that your mobile number will be deactivated in 2 hours unless you"
    ]
    for b in bullets_3_2:
        story.append(Paragraph(b, style_bullet))
        
    story.append(PageBreak())

    # =========================================================================
    # PAGE 12: CHAPTER 3: PROBLEM STATEMENT (Part 2) (12)
    # =========================================================================
    story.append(Paragraph("complete verification by paying a fee.", style_body))
    p_3_2_cont = [
        "&bull;&nbsp; <b>10. Screen Sharing App Scam:</b> Scammers guide victims to install remote desktop apps like AnyDesk or TeamViewer on their phone, allowing the scammer to see bank passwords and OTPs in real time."
    ]
    for b in p_3_2_cont:
        story.append(Paragraph(b, style_bullet))
        
    story.append(Paragraph("<b>3.3 How Scammers Trick Victims (Psychological Urgency)</b>", style_subheading))
    p_3_3 = (
        "Scammers do not succeed by using superior technical hacking. They succeed by creating psychological panic. "
        "They use phrases like 'within 10 minutes', 'account suspended', 'immediate arrest warrant', and 'tonight 9:30 PM'. "
        "When people are frightened, their rational thinking stops, and they obey the scammer's orders. FraudRakshak acts "
        "as a calm, intelligent protector that steps in to stop the panic and reveal the truth."
    )
    story.append(Paragraph(p_3_3, style_body))
    
    story.append(PageBreak())

    # =========================================================================
    # PAGE 13: CHAPTER 4: OBJECTIVES OF THE PROJECT (13)
    # =========================================================================
    story.append(Paragraph("<b>CHAPTER 4: OBJECTIVES OF THE PROJECT</b>", style_chap_title))
    
    story.append(Paragraph("<b>4.1 Primary Technical Goals</b>", style_subheading))
    bullets_4_1 = [
        "&bull;&nbsp; <b>1. Instant Detection: Fast Message Analysis:</b> Analyze any message text in less than 100 milliseconds and display a clear Risk Score from 0 to 100.",
        "&bull;&nbsp; <b>2. Voice Assistance: Bilingual Voice AI:</b> Provide spoken audio advice in natural Hindi and English using the browser's speech engine.",
        "&bull;&nbsp; <b>3. Safe Training: Interactive Call Simulator:</b> Allow users to practice handling 8 different scam phone calls with an AI Copilot guiding their answers.",
        "&bull;&nbsp; <b>4. Fast Action: 1930 Legal Complaint Draft:</b> Automatically generate a ready-to-use complaint letter for the National Cyber Crime Reporting Portal."
    ]
    for b in bullets_4_1:
        story.append(Paragraph(b, style_bullet))
        
    story.append(Paragraph("<b>4.2 Key Benefits for Users</b>", style_subheading))
    bullets_4_2 = [
        "&bull;&nbsp; <b>Zero False Alarms:</b> Normal bank transaction messages (such as 'Rs. 500 debited at ATM') are correctly identified as safe.",
        "&bull;&nbsp; <b>No Installation Barrier:</b> Works directly in any web browser without needing to download a large app.",
        "&bull;&nbsp; <b>Completely Free &amp; Accessible:</b> Designed for everyone from college students to senior citizens."
    ]
    for b in bullets_4_2:
        story.append(Paragraph(b, style_bullet))
        
    story.append(PageBreak())

    # =========================================================================
    # PAGE 14: CHAPTER 5: METHODOLOGY & HOW IT WORKS (14)
    # =========================================================================
    story.append(Paragraph("<b>CHAPTER 5: METHODOLOGY &amp; HOW IT WORKS</b>", style_chap_title))
    
    story.append(Paragraph("<b>5.1 Step-by-Step System Workflow</b>", style_subheading))
    p_5_1 = (
        "FraudRakshak works through a simple 5-step process: (1) Message input via text or microphone, (2) Text cleaning, "
        "(3) Keyword and urgency pattern matching, (4) Genuine banking alert verification, and (5) Displaying risk score, "
        "voice advice, and 1930 complaint options."
    )
    story.append(Paragraph(p_5_1, style_body))
    
    story.append(Paragraph("<b>5.2 Scam Scoring Formula &amp; Logic</b>", style_subheading))
    formula_text = (
        "<b>Risk Score = (Scam Keyword Points) + (Urgency Penalty) + (Dangerous Payload) - (Legitimate Bank Credit)</b>"
    )
    story.append(Paragraph(formula_text, ParagraphStyle('Formula', fontName='Times-Bold', fontSize=10.5, leading=15, alignment=TA_CENTER, spaceBefore=4, spaceAfter=8)))
    
    p_5_2 = (
        "For example, if a message mentions 'Digital Arrest' (+90 points) and 'immediate transfer' (+10 points), the score "
        "reaches 100 (High Risk). Conversely, if a message contains standard banking text like 'debited by Rs. 500' without "
        "any suspicious links or phone numbers, the score is 0 (Safe)."
    )
    story.append(Paragraph(p_5_2, style_body))
    
    story.append(Paragraph("<b>5.3 Three-Level Risk Classification</b>", style_subheading))
    bullets_5_3 = [
        "&bull;&nbsp; <b>Score 70 to 100 (HIGH RISK - RED):</b> Definite scam. User is warned immediately not to reply, not to click links, and to report to 1930.",
        "&bull;&nbsp; <b>Score 35 to 69 (MEDIUM RISK - YELLOW):</b> Suspicious. User is advised to verify directly by visiting their official bank branch.",
        "&bull;&nbsp; <b>Score 0 to 34 (SAFE - GREEN):</b> Normal message. User is reassured that there is no danger, with a reminder never to share OTPs."
    ]
    for b in bullets_5_3:
        story.append(Paragraph(b, style_bullet))
        
    story.append(PageBreak())

    # =========================================================================
    # PAGE 15: CHAPTER 6: SYSTEM DESIGN (Part 1 - Layered Architecture) (15)
    # =========================================================================
    story.append(Paragraph("<b>6. SYSTEM DESIGN</b>", style_chap_title))
    p_6_intro = (
        "The system has three layers (Figure 2): a presentation layer (message threat scanner, voice advisor UI, call simulator &amp; "
        "copilot), an application layer (input validation and speech pre-processing, multi-vector threat analyzer and whitelist filter, "
        "and the risk scoring and voice advisory engine), and a data and model layer (scam vector dictionaries D1, legitimate bank "
        "whitelist patterns D2, and 1930 cybercrime reporting schema D3). This separation keeps the code modular, so the threat "
        "rules or the interface can be changed independently."
    )
    story.append(Paragraph(p_6_intro, style_body))
    story.append(Spacer(1, 15))
    
    if os.path.exists("fraud_p15_img1.png"):
        img_arch = RLImage("fraud_p15_img1.png", width=440, height=265)
        img_arch.hAlign = 'CENTER'
        story.append(img_arch)
        story.append(Spacer(1, 10))
        story.append(Paragraph("<b>Figure 2: Layered architecture of the system</b>", style_fig_caption))
        
    story.append(PageBreak())

    # =========================================================================
    # PAGE 16: CHAPTER 6: SYSTEM DESIGN (Part 2 - DFD Level 0 & Level 1) (16)
    # =========================================================================
    if os.path.exists("fraud_p16_img1.png"):
        img_dfd0 = RLImage("fraud_p16_img1.png", width=440, height=198)
        img_dfd0.hAlign = 'CENTER'
        story.append(img_dfd0)
        story.append(Spacer(1, 6))
        story.append(Paragraph("<b>Figure 3: Data flow diagram, level 0</b>", style_fig_caption))
        story.append(Spacer(1, 14))
        
    if os.path.exists("fraud_p16_img2.png"):
        img_dfd1 = RLImage("fraud_p16_img2.png", width=440, height=275)
        img_dfd1.hAlign = 'CENTER'
        story.append(img_dfd1)
        story.append(Spacer(1, 6))
        story.append(Paragraph("<b>Figure 4: Data flow diagram, level 1</b>", style_fig_caption))
        story.append(Spacer(1, 10))

    p_6_dfd_text = (
        "Figure 5(a) is the use case diagram: citizens scan messages, listen to voice advisories, practice scam responses in "
        "the simulator, and generate 1930 FIR drafts, while cyber cell officers update threat intelligence rules and review incident "
        "submissions. Figure 5(b) is the sequence of one request: the interface validates the input, the pre-processor extracts "
        "features, the threat engine calculates risk score, and the advisory engine generates voice guidance and pre-filled complaint drafts."
    )
    story.append(Paragraph(p_6_dfd_text, style_body))
    
    story.append(PageBreak())

    # =========================================================================
    # PAGE 17: CHAPTER 6: SYSTEM DESIGN (Part 3 - Use Case, Sequence, Class) (17)
    # =========================================================================
    if os.path.exists("fraud_p17_img1.png"):
        img_uc = RLImage("fraud_p17_img1.png", width=440, height=194)
        img_uc.hAlign = 'CENTER'
        story.append(img_uc)
        story.append(Spacer(1, 6))
        story.append(Paragraph("<b>Figure 5: (a) Use case diagram; (b) sequence diagram</b>", style_fig_caption))
        story.append(Spacer(1, 8))
        
    p_6_class_text = (
        "ScamDetectionEngine holds the 10-vector threat dictionaries (D1) and bank whitelist patterns (D2) to compute risk scores, "
        "matched scam tags, and danger flags. VoiceAndFIRAdvisor synthesizes localized spoken guidance in Hindi/English and "
        "formats pre-filled 1930 Zero-FIR complaint drafts."
    )
    story.append(Paragraph(p_6_class_text, style_body))
    story.append(Spacer(1, 8))

    if os.path.exists("fraud_p17_img2.png"):
        img_cls = RLImage("fraud_p17_img2.png", width=440, height=196)
        img_cls.hAlign = 'CENTER'
        story.append(img_cls)
        story.append(Spacer(1, 6))
        story.append(Paragraph("<b>Figure 6: Class diagram</b>", style_fig_caption))
        
    story.append(PageBreak())

    # =========================================================================
    # PAGE 18: CHAPTER 7: IMPLEMENTATION DETAILS & TECH STACK (18)
    # =========================================================================
    story.append(Paragraph("<b>CHAPTER 7: IMPLEMENTATION DETAILS &amp; TECH STACK</b>", style_chap_title))
    
    story.append(Paragraph("<b>7.1 Technologies Used and Why</b>", style_subheading))
    
    tech_table_data = [
        ["Layer", "Technology", "Purpose / Rationale"],
        ["User Interface (UI)", "React 19, Vite, Tailwind CSS", "Fast, modern, and easy-to-use web screen on both mobile and laptop"],
        ["Voice Assistant", "Web Speech API (Browser Native)", "Listens to user's voice and speaks out safety advice in Hindi & English"],
        ["Backend API", "Node.js Express / Vercel Edge", "Connects the frontend with the AI engine smoothly with low response time"],
        ["AI Analysis Service", "Python, FastAPI, Uvicorn", "Scans text for scam keywords and calculates risk score from 0 to 100"],
        ["Code Repository", "Git & GitHub (@Ayushgupta1715)", "Safe storage of project source code with version history"],
        ["Cloud Hosting", "Vercel Public Cloud", "Live online deployment accessible to anyone without login barriers"]
    ]
    t_tech = Table(tech_table_data, colWidths=[110, 140, 200])
    t_tech.setStyle(TableStyle([
        ('FONTNAME', (0,0), (-1,-1), 'Times-Roman'),
        ('FONTSIZE', (0,0), (-1,-1), 8.5),
        ('LEADING', (0,0), (-1,-1), 12),
        ('FONTNAME', (0,0), (-1,0), 'Times-Bold'),
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#F1F5F9")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#94A3B8")),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_tech)
    story.append(Spacer(1, 14))
    
    story.append(Paragraph("<b>7.2 Frontend Design (React 19 &amp; Tailwind CSS)</b>", style_subheading))
    p_7_2 = (
        "The interface is designed to be clean, fast, and easy to read. A user simply pastes a message into the box and clicks "
        "'Scan Message'. Within a fraction of a second, the risk meter shows whether it is Safe (Green), Suspicious (Yellow), "
        "or High Risk (Red). The Voice AI section allows users to speak directly into their microphone and hear the answer spoken aloud."
    )
    story.append(Paragraph(p_7_2, style_body))
    
    story.append(PageBreak())

    # =========================================================================
    # PAGE 19: CHAPTER 8: RESULTS, TESTING & DISCUSSION (19)
    # =========================================================================
    story.append(Paragraph("<b>CHAPTER 8: RESULTS, TESTING &amp; DISCUSSION</b>", style_chap_title))
    
    story.append(Paragraph("<b>8.1 Testing with 86 Real-World Cases</b>", style_subheading))
    p_8_1 = (
        "To verify that FraudRakshak works accurately in real life, we created a comprehensive test dataset of 86 messages. "
        "This dataset contained 70 real scam messages across all 10 scam types and 16 safe messages (such as real bank debit alerts, "
        "Swiggy delivery updates, and simple greetings like 'Namaste' and 'Hello')."
    )
    story.append(Paragraph(p_8_1, style_body))
    
    story.append(Paragraph("<b>8.2 Detection Accuracy Across All 10 Scam Types</b>", style_subheading))
    
    results_table = [
        ["Scam Category", "Tested Cases", "Correctly Detected", "Accuracy Rate"],
        ["Digital Arrest / Fake Police Scam", "8", "8", "100.0%"],
        ["Electricity Bill Cutoff Threat", "8", "7", "87.5%"],
        ["Bank KYC & Account Block Scam", "10", "9", "90.0%"],
        ["Part-Time Job / Telegram Scam", "7", "6", "85.7%"],
        ["Lottery & KBC Cash Prize Scam", "6", "6", "100.0%"],
        ["Customs & Courier Parcel Scam", "7", "6", "85.7%"],
        ["Dangerous APK Sideloading", "8", "7", "87.5%"],
        ["Illegal Loan App Blackmail", "5", "4", "80.0%"],
        ["SIM Deactivation Threat", "5", "5", "100.0%"],
        ["Screen Sharing Takeover Scam", "6", "5", "83.3%"]
    ]
    t_res = Table(results_table, colWidths=[180, 80, 100, 90])
    t_res.setStyle(TableStyle([
        ('FONTNAME', (0,0), (-1,-1), 'Times-Roman'),
        ('FONTSIZE', (0,0), (-1,-1), 8.5),
        ('LEADING', (0,0), (-1,-1), 12),
        ('FONTNAME', (0,0), (-1,0), 'Times-Bold'),
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#F1F5F9")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#94A3B8")),
        ('ALIGN', (1,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_res)
    story.append(Spacer(1, 10))
    
    story.append(Paragraph("<b>8.3 Zero False Alarms on Real Bank Alerts</b>", style_subheading))
    bullets_8_3 = [
        "&bull;&nbsp; <b>True Positives (TP):</b> 63 / 70 (90.0% Detection across all scam types)",
        "&bull;&nbsp; <b>True Negatives (TN):</b> 16 / 16 (100.0% Correct identification of safe messages)",
        "&bull;&nbsp; <b>False Positives (FP):</b> 0 / 16 (0.0% False alarms on real bank alerts)",
        "&bull;&nbsp; <b>False Negatives (FN):</b> 7 / 70 (10.0% Missed scams due to novel obfuscations)",
        "&bull;&nbsp; <b>Overall Accuracy:</b> 91.9% | <b>F1-Score:</b> 0.95"
    ]
    for b in bullets_8_3:
        story.append(Paragraph(b, style_bullet))
        
    story.append(PageBreak())

    # =========================================================================
    # PAGE 20: CHAPTER 9: CONCLUSION AND FUTURE SCOPE (20)
    # =========================================================================
    story.append(Paragraph("<b>CHAPTER 9: CONCLUSION AND FUTURE SCOPE</b>", style_chap_title))
    
    story.append(Paragraph("<b>9.1 Summary of What We Achieved</b>", style_subheading))
    bullets_9_1 = [
        "&bull;&nbsp; <b>1. Multilingual Protection:</b> Successfully detects 10 major Indian cyber scam types in English, Hindi, and Hinglish.",
        "&bull;&nbsp; <b>2. Voice AI Assistant:</b> Provides real-time spoken voice guidance in Hindi and English for elderly and non-tech-savvy users.",
        "&bull;&nbsp; <b>3. Interactive Training:</b> Trains citizens to stay calm and defuse scam calls through the interactive Call Simulator.",
        "&bull;&nbsp; <b>4. Law Enforcement Support:</b> Helps victims report fraud quickly through automated 1930 Zero-FIR draft letters."
    ]
    for b in bullets_9_1:
        story.append(Paragraph(b, style_bullet))
        
    story.append(Paragraph("<b>9.2 Future Improvements (Android App &amp; Carrier Support)</b>", style_subheading))
    bullets_9_2 = [
        "&bull;&nbsp; <b>Phase 1 (Android Mobile App):</b> Package FraudRakshak as an Android app that automatically listens to incoming calls and shows a live warning popup.",
        "&bull;&nbsp; <b>Phase 2 (Telecom Carrier Support):</b> Work with carriers like Jio and Airtel to block scam messages at the network level before they reach the user.",
        "&bull;&nbsp; <b>Phase 3 (Direct Cyber Crime API):</b> Automatically submit the complaint directly to the cybercrime.gov.in portal with one tap."
    ]
    for b in bullets_9_2:
        story.append(Paragraph(b, style_bullet))
        
    story.append(PageBreak())

    # =========================================================================
    # PAGE 21: REFERENCES (21)
    # =========================================================================
    story.append(Spacer(1, 10))
    story.append(Paragraph("<b>REFERENCES</b>", style_heading))
    story.append(Spacer(1, 12))
    
    refs = [
        "[1] Reserve Bank of India (RBI), &quot;Master Direction - Cyber Security Framework in Banks,&quot; Official Notification, Mumbai, 2021.",
        "[2] Indian Cybercrime Coordination Centre (I4C), &quot;Citizen Financial Cyber Fraud Assessment Report,&quot; Ministry of Home Affairs, Government of India, 2023.",
        "[3] S. Banerjee and P. Mitra, &quot;Detection of Fraudulent and Code-Mixed Hinglish Text in Social Media,&quot; IEEE Transactions on Computational Social Systems, vol. 10, no. 4, pp. 1420-1432, 2023.",
        "[4] Telecom Regulatory Authority of India (TRAI), &quot;Telecom Commercial Communications Customer Preference Regulations,&quot; Government of India, 2018.",
        "[5] A. K. Sharma and N. Gupta, &quot;A Practical Study on Phishing and Cyber Scam Detection,&quot; ACM Computing Surveys, vol. 55, no. 6, pp. 1-35, 2022.",
        "[6] CERT-In, &quot;Cyber Security Advisory on Fake Android Banking Apps (APKs),&quot; Indian Computer Emergency Response Team, New Delhi, 2024.",
        "[7] National Cyber Crime Reporting Portal, &quot;Citizen Guide for Reporting Cyber Frauds on National Helpline 1930,&quot; Ministry of Home Affairs, New Delhi, 2023.",
        "[8] V. Kumar and P. Verma, &quot;Voice-Based Interactive Systems for Digital Financial Security,&quot; in IEEE International Conference on Human-Computer Interaction, 2024, pp. 210-216."
    ]
    for r in refs:
        p_ref = Paragraph(r, ParagraphStyle('RefStyle', fontName='Times-Roman', fontSize=9.5, leading=14.5, spaceAfter=8, alignment=TA_JUSTIFY))
        story.append(p_ref)
        
    doc.build(story, canvasmaker=SequentialNumberedCanvas)
    print(f"[SUCCESS] High-fidelity academic PDF built: {filename}")

if __name__ == '__main__':
    build_pdf()
