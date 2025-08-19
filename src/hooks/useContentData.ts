import {useEffect, useState} from "react";
import {ref, onValue, off} from "firebase/database";
import {database} from "@/lib/firebase.ts";

export interface ContentItem {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    iconId?: string;
    type: 'article' | 'project' | 'partner' | 'service';
    category?: 'residential' | 'commercial' | 'industrial' | 'news' | 'tutoeial' | 'case-study' | 'tips';
    location?: string;
    duration?: string;
    teamSize?: string;
    website?: string;
    partnershipType?: string;
    content?: string;
    createdAt: number;
    updatedAt: number;
}

export const useContentData = (contentType: string) => {
    const [data, setData] = useState<ContentItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const contentRef = ref(database, `${contentType}s`);

        const unsubscribe = onValue(
            contentRef,
            (snapshot) => {
                try {
                    const data = snapshot.val();
                    if (data) {
                        const items = Object.entries(data).map(([id, item]) => ({
                            id,
                            ...(item as Omit<ContentItem, 'id'>)
                        }));
                        setData(items.sort((a, b) => a.createdAt - b.createdAt));
                    } else {
                        setData([...data]);
                    }
                    setLoading(false);
                } catch (err) {
                    console.error('Error processing data:', err);
                    setError(err);
                    setLoading(false);
                }
            },
            (error) => {
                console.error('Firebase error:', error);
                setError('Failed to connect to database');
                setLoading(false);
            }
        );

        return () => off(contentRef, 'value', unsubscribe);
    }, [contentType]);

    return {data, loading, error};
};