import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setPreviewData({});
    console.log('Preview mode enabled');
    res.redirect('/');
}
