// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Asset, Entry } from 'contentful';
import { Document } from '@contentful/rich-text-types';

export interface IButtonFields {
    /** Label */
    label: string;

    /** URL */
    url?: string | undefined;

    /** Color scheme */
    theme: 'primary' | 'secondary';
}

export interface IButton extends Entry<IButtonFields> {
    sys: {
        id: string;
        type: string;
        createdAt: string;
        updatedAt: string;
        locale: string;
        contentType: {
            sys: {
                id: 'Button';
                linkType: 'ContentType';
                type: 'Link';
            };
        };
    };
}

export interface ICardFields {
    /** Heading */
    heading: string;

    /** Subheading */
    subheading?: string | undefined;

    /** URL */
    url?: string | undefined;
}

export interface ICard extends Entry<ICardFields> {
    sys: {
        id: string;
        type: string;
        createdAt: string;
        updatedAt: string;
        locale: string;
        contentType: {
            sys: {
                id: 'Card';
                linkType: 'ContentType';
                type: 'Link';
            };
        };
    };
}

export interface ICardGridSectionFields {
    /** Heading */
    heading: string;

    /** Subheading */
    subheading?: string | undefined;

    /** Cards */
    cards: ICard[];
}

export interface ICardGridSection extends Entry<ICardGridSectionFields> {
    sys: {
        id: string;
        type: string;
        createdAt: string;
        updatedAt: string;
        locale: string;
        contentType: {
            sys: {
                id: 'CardGridSection';
                linkType: 'ContentType';
                type: 'Link';
            };
        };
    };
}

export interface IFooterConfigFields {
    /** Body */
    body: string;
}

export interface IFooterConfig extends Entry<IFooterConfigFields> {
    sys: {
        id: string;
        type: string;
        createdAt: string;
        updatedAt: string;
        locale: string;
        contentType: {
            sys: {
                id: 'FooterConfig';
                linkType: 'ContentType';
                type: 'Link';
            };
        };
    };
}

export interface IHeroSectionFields {
    /** Heading */
    heading?: string | undefined;

    /** Subheading */
    subheading?: string | undefined;

    /** Buttons */
    buttons: IButton[];
}

export interface IHeroSection extends Entry<IHeroSectionFields> {
    sys: {
        id: string;
        type: string;
        createdAt: string;
        updatedAt: string;
        locale: string;
        contentType: {
            sys: {
                id: 'HeroSection';
                linkType: 'ContentType';
                type: 'Link';
            };
        };
    };
}

export interface IPageFields {
    /** Slug */
    slug: string;

    /** Layout */
    layout: string;

    /** Title */
    title: string;

    /** Sections */
    sections: (ICardGridSection | IHeroSection)[];
}

export interface IPage extends Entry<IPageFields> {
    sys: {
        id: string;
        type: string;
        createdAt: string;
        updatedAt: string;
        locale: string;
        contentType: {
            sys: {
                id: 'Page';
                linkType: 'ContentType';
                type: 'Link';
            };
        };
    };
}

export interface ISiteConfigFields {
    /** Title */
    title: string;

    /** Favicon */
    favicon?: Asset | undefined;

    /** Footer */
    footer: IFooterConfig;
}

export interface ISiteConfig extends Entry<ISiteConfigFields> {
    sys: {
        id: string;
        type: string;
        createdAt: string;
        updatedAt: string;
        locale: string;
        contentType: {
            sys: {
                id: 'SiteConfig';
                linkType: 'ContentType';
                type: 'Link';
            };
        };
    };
}

export type CONTENT_TYPE = 'Button' | 'Card' | 'CardGridSection' | 'FooterConfig' | 'HeroSection' | 'Page' | 'SiteConfig';

export type LOCALE_CODE = 'en-US';

export type CONTENTFUL_DEFAULT_LOCALE_CODE = 'en-US';
