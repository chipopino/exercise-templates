import React, { useMemo } from 'react';
import DOMPurify from "dompurify";
import { cn } from 'src/shared/methodes';

export default function Content({ content, className }: { content: string, className?: string }) {
    return useMemo(
        () => <div
            className={cn(className, 'text-color img-filter-4-paragraph')}
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(content)
            }}
        />, [content]
    );
}