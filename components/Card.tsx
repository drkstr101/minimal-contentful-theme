import * as React from 'react';
import Link from 'next/link';
import Markdown from 'markdown-to-jsx';
import { toFieldPath, pickDataAttrs } from '@stackbit/annotations';
import { ICard } from '../types/sourcebit';

export const Card = (props: ICard) => {
    return (
        <Link href={props.url ?? '/'}>
            <a {...pickDataAttrs(props)} className="card">
                <h3 className="card-heading" {...toFieldPath('.heading')}>
                    {props.heading}
                </h3>
                {props.subheading && (
                    <Markdown className="card-subheading" {...toFieldPath('.subheading')}>
                        {props.subheading}
                    </Markdown>
                )}
            </a>
        </Link>
    );
};
