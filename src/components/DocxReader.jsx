import React, { useState } from "react";
import PizZip from "pizzip";
import { DOMParser } from "@xmldom/xmldom";
import axios from "axios";

function askQuestion(question, content) {
    const body = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "user",
                "content": question + " " + content
            }
        ]
    };

    const config = {
        headers: {
            'Authorization': `Bearer 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`,
            'Content-Type': 'application/json'
        }
    }

    console.log("PERFORMING POST REQUEST");

    axios.post(`https://api.openai.com/v1/chat/completions`,  body, config)
        .then(res => {
            console.log(res);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });
}

function str2xml(str) {
    if (str.charCodeAt(0) === 65279) {
        // BOM sequence
        str = str.substr(1);
    }
    return new DOMParser().parseFromString(str, "text/xml");
}

// Get paragraphs as javascript array
function getParagraphs(content) {
    const zip = new PizZip(content);
    const xml = str2xml(zip.files["word/document.xml"].asText());
    const paragraphsXml = xml.getElementsByTagName("w:p");
    const paragraphs = [];

    for (let i = 0, len = paragraphsXml.length; i < len; i++) {
        let fullText = "";
        const textsXml = paragraphsXml[i].getElementsByTagName("w:t");
        for (let j = 0, len2 = textsXml.length; j < len2; j++) {
            const textXml = textsXml[j];
            if (textXml.childNodes) {
                fullText += textXml.childNodes[0].nodeValue;
            }
        }
        if (fullText) {
            paragraphs.push(fullText);
        }
    }
    return paragraphs;
}

const DocxReader = () => {
    const [paragraphs, setParagraphs] = useState([]);

    const onFileUpload = (event) => {
        const reader = new FileReader();
        let file = event.target.files[0];

        reader.onload = (e) => {
            const content = e.target.result;
            const paragraphs = getParagraphs(content);
            setParagraphs(paragraphs);
        };

        reader.onerror = (err) => console.error(err);

        reader.readAsBinaryString(file);
    };

    console.log(paragraphs);

    askQuestion("Hoe veel jaar ervaring heeft deze persoon?", paragraphs);

    return <input type="file" onChange={onFileUpload} name="docx-reader" />;
};

export default DocxReader;