import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const filePath = path.join(process.cwd(), 'src', 'lib', 'posts', 'post1.svx');
    const content = fs.readFileSync(filePath, 'utf-8');
    res.status(200).send(content);
}
