const fs = require('fs');
const path = require('path');

function fixImports(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            fixImports(fullPath);
        } else if (file.endsWith('.jsx') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            // Replace paths targeting lowercase folders incorrectly cased
            const regexps = [
                { match: /@\/Components\//g, replace: '@/components/' },
                { match: /@\/Layouts\//g, replace: '@/layouts/' },
                { match: /@\/Pages\//g, replace: '@/pages/' },
                { match: /@\/Hooks\//g, replace: '@/hooks/' },
                { match: /@\/Lib\//g, replace: '@/lib/' },
                { match: /@\/Types\//g, replace: '@/types/' },
                { match: /@\/Routes\//g, replace: '@/routes/' }
            ];

            regexps.forEach(r => {
                content = content.replace(r.match, r.replace);
            });

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated imports in: ${fullPath}`);
            }
        }
    });
}

const jsDir = path.join(__dirname, 'resources', 'js');
fixImports(jsDir);
console.log('Done fixing imports.');
