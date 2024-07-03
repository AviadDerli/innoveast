import React, { useEffect, useRef, useState } from 'react';
import WordCloud from 'wordcloud';
import { useSurveyStore } from '../../store';

export default function WordCloudComp() {
    const allResponses = useSurveyStore((state) => state.allResponses);
    const canvasRef = useRef(null);
    const [words, setWords] = useState([]);

    useEffect(() => {
        const wordCount = {};

        allResponses.forEach(response => {
            Object.entries(response).forEach(([key, value]) => {
                if (typeof value === 'boolean' && value) {
                    wordCount[key] = (wordCount[key] || 0) + 10;
                } else if (typeof value === 'string' && value !== '') {
                    // פיצול המחרוזת למילים בודדות
                    const words = value.toLowerCase().split(/\s+/);
                    words.forEach(word => {
                        wordCount[word] = (wordCount[word] || 0) + 10;
                    });
                }
            });
        });

        // הוספת המילה "love" עם משקל גבוה
        wordCount['love'] = 200;

        const newWords = Object.entries(wordCount).map(([word, count]) => [word, count]);
        setWords(newWords);
    }, [allResponses]);

    useEffect(() => {
        if (canvasRef.current && words.length > 0) {
            WordCloud(canvasRef.current, {
                list: words,
                gridSize: Math.round(16 * canvasRef.current.width / 1024),
                weightFactor: function (size) {
                    return Math.pow(size, 0.5) * 5; // שורש ריבועי של המשקל כדי למתן את ההבדלים
                },
                fontFamily: 'Heebo, sans-serif',
                color: (word, weight) => {
                    return word.toLowerCase() === 'love' ? 'red' : '#c09292';
                },
                rotateRatio: 0.5,
                rotationSteps: 2,
                backgroundColor: '#ffe0e0',
                minSize: 10,
            });
        }
    }, [words]);

    return (
        <div>
            <canvas ref={canvasRef} width={800} height={600}></canvas>
        </div>
    );
};