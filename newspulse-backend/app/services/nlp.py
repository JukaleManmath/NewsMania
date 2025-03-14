import spacy

nlp = spacy.load("en_core_web_sm")

def categorize_articles(title: str, description: str):
    doc = nlp(f"{title}{description}")
    if "politics" in doc.text or "government" in doc.text or "election" in doc.text:
        return "Politics"
    elif "sports" in doc.text or "football" in doc.text or "cricket" in doc.text:
        return "Sports"
    elif "technology" in doc.text or "AI" in doc.text or "software" in doc.text:
        return "Technology"
    elif "business" in doc.text or "stocks" in doc.text or "finance" in doc.text:
        return "Business"
    elif "entertainment" in doc.text or "movie" in doc.text or "music" in doc.text:
        return "Entertainment"
    elif "science" in doc.text or "space" in doc.text or "physics" in doc.text:
        return "Science"
    else:
        return "General"