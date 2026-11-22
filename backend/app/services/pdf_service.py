import os
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch

from app.config import settings

class PDFService:
    def __init__(self):
        pass

    def generate_scan_report(self, scan_data: dict) -> str:
        """
        Generates a professional academic PDF report for a completed scan.
        Returns the absolute filepath to the created PDF.
        """
        scan_id = scan_data.get("id", "UNKNOWN")
        reports_dir = os.path.join(settings.UPLOAD_DIR, "reports")
        os.makedirs(reports_dir, exist_ok=True)
        pdf_path = os.path.join(reports_dir, f"report_{scan_id}.pdf")

        doc = SimpleDocTemplate(
            pdf_path,
            pagesize=letter,
            rightMargin=40,
            leftMargin=40,
            topMargin=40,
            bottomMargin=40
        )

        styles = getSampleStyleSheet()
        
        # Custom Typography
        title_style = ParagraphStyle(
            'DocTitle',
            parent=styles['Heading1'],
            fontName='Helvetica-Bold',
            fontSize=22,
            textColor=colors.HexColor('#1E293B'),
            spaceAfter=4
        )
        subtitle_style = ParagraphStyle(
            'DocSubtitle',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=10,
            textColor=colors.HexColor('#64748B'),
            spaceAfter=15
        )
        section_style = ParagraphStyle(
            'SectionHeader',
            parent=styles['Heading2'],
            fontName='Helvetica-Bold',
            fontSize=13,
            textColor=colors.HexColor('#0F172A'),
            spaceBefore=12,
            spaceAfter=6
        )
        body_style = ParagraphStyle(
            'Body',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=10,
            textColor=colors.HexColor('#334155'),
            leading=14
        )
        badge_style = ParagraphStyle(
            'Badge',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=12,
            leading=16,
            alignment=1
        )

        elements = []

        # 1. Header Banner
        elements.append(Paragraph("TRUTHLENS AI VERIFICATION REPORT", title_style))
        elements.append(Paragraph("AI-Powered Fake News & Deepfake Detection Platform | Academic Mini Project", subtitle_style))
        elements.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#3B82F6'), spaceAfter=15))

        # 2. Key Metadata Table
        created_at_str = str(scan_data.get("created_at", "N/A"))
        if len(created_at_str) > 19:
            created_at_str = created_at_str[:19]

        meta_data = [
            [Paragraph("<b>Scan Identifier:</b>", body_style), Paragraph(str(scan_id), body_style)],
            [Paragraph("<b>Media Type:</b>", body_style), Paragraph(str(scan_data.get("content_type", "")).upper(), body_style)],
            [Paragraph("<b>Analysis Date & Time:</b>", body_style), Paragraph(created_at_str, body_style)],
            [Paragraph("<b>Verification Status:</b>", body_style), Paragraph(str(scan_data.get("status", "")).capitalize(), body_style)],
        ]
        meta_table = Table(meta_data, colWidths=[150, 380])
        meta_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F8FAFC')),
            ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#E2E8F0')),
            ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E2E8F0')),
            ('TOPPADDING', (0,0), (-1,-1), 6),
            ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ]))
        elements.append(meta_table)
        elements.append(Spacer(1, 15))

        # 3. Prediction & Verdict Card
        prediction = scan_data.get("prediction", "Unknown")
        confidence = scan_data.get("confidence_score", 0.0)

        # Color coding
        if "Fake" in prediction or "Manipulated" in prediction or "False" in prediction:
            bg_color = colors.HexColor('#FEE2E2')
            text_color = colors.HexColor('#991B1B')
            border_color = colors.HexColor('#EF4444')
        elif "Authentic" in prediction or "Verified" in prediction:
            bg_color = colors.HexColor('#DCFCE7')
            text_color = colors.HexColor('#166534')
            border_color = colors.HexColor('#22C55E')
        else:
            bg_color = colors.HexColor('#FEF3C7')
            text_color = colors.HexColor('#92400E')
            border_color = colors.HexColor('#F59E0B')

        badge_p = Paragraph(f"<font color='{text_color}'>PREDICTION: {prediction.upper()} | CONFIDENCE: {confidence}%</font>", badge_style)
        verdict_table = Table([[badge_p]], colWidths=[530])
        verdict_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), bg_color),
            ('BOX', (0,0), (-1,-1), 1.5, border_color),
            ('TOPPADDING', (0,0), (-1,-1), 10),
            ('BOTTOMPADDING', (0,0), (-1,-1), 10),
            ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ]))
        elements.append(verdict_table)
        elements.append(Spacer(1, 15))

        # 4. Input Reference
        elements.append(Paragraph("Submitted Input Reference", section_style))
        input_ref = scan_data.get("input_reference", "N/A")
        if len(input_ref) > 300:
            input_ref = input_ref[:300] + "..."
        elements.append(Paragraph(f"<i>\"{input_ref}\"</i>", body_style))
        elements.append(Spacer(1, 10))

        # 5. Detected Indicators
        elements.append(Paragraph("Detected Suspicious & Forensic Indicators", section_style))
        analysis_res = scan_data.get("analysis_results", [])
        explanation_text = "No explanation available."
        indicators_list = []
        model_name = "TruthLens Forensic Engine"

        if analysis_res and len(analysis_res) > 0:
            primary_res = analysis_res[0]
            explanation_text = primary_res.get("explanation", "")
            model_name = f"{primary_res.get('model_name', 'TruthLens')} (v{primary_res.get('model_version', '1.0')})"
            pred_details = primary_res.get("prediction_details") or {}
            if "indicators" in scan_data:
                indicators_list = scan_data["indicators"]
            elif "indicators" in pred_details:
                indicators_list = pred_details["indicators"]

        if not indicators_list:
            indicators_list = ["Analysis based on spectral/lexical density metrics."]

        ind_data = []
        for ind in indicators_list:
            ind_data.append([Paragraph("•", body_style), Paragraph(str(ind), body_style)])

        ind_table = Table(ind_data, colWidths=[20, 510])
        ind_table.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ]))
        elements.append(ind_table)
        elements.append(Spacer(1, 10))

        # 6. Detailed Explanation
        elements.append(Paragraph("Forensic Explanation", section_style))
        elements.append(Paragraph(explanation_text, body_style))
        elements.append(Spacer(1, 10))

        # 7. Verification Sources (if any)
        sources = scan_data.get("verification_sources", [])
        if sources:
            elements.append(Paragraph("Corroborating & Reference Sources", section_style))
            source_rows = [
                [
                    Paragraph("<b>Source Title</b>", body_style),
                    Paragraph("<b>Evidence Type</b>", body_style),
                    Paragraph("<b>Relevance</b>", body_style)
                ]
            ]
            for s in sources:
                source_rows.append([
                    Paragraph(f"<a href='{s.get('source_url', '#')}'><u>{s.get('source_title', 'Source')}</u></a>", body_style),
                    Paragraph(str(s.get("evidence_type", "neutral")).capitalize(), body_style),
                    Paragraph(f"{round(float(s.get('relevance_score', 0.0)) * 100)}%", body_style)
                ])
            src_table = Table(source_rows, colWidths=[320, 110, 100])
            src_table.setStyle(TableStyle([
                ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#F1F5F9')),
                ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
                ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E2E8F0')),
                ('TOPPADDING', (0,0), (-1,-1), 5),
                ('BOTTOMPADDING', (0,0), (-1,-1), 5),
            ]))
            elements.append(src_table)
            elements.append(Spacer(1, 15))

        # 8. Disclaimer & Footer
        elements.append(Spacer(1, 10))
        elements.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#CBD5E1'), spaceAfter=10))
        disclaimer = (
            f"<b>Model Reference:</b> {model_name} | <b>Academic Notice:</b> TruthLens AI generates probabilistic "
            "evaluations based on machine learning models and digital forensics. Predictions are assistive diagnostic "
            "indicators and should be corroborated with verified primary sources."
        )
        elements.append(Paragraph(disclaimer, subtitle_style))

        # Build PDF
        doc.build(elements)
        return pdf_path

pdf_service = PDFService()
