"""Build a single-file preview (dist/invite.html) with CSS, JS and images inlined.
Usage: python3 build.py   |   Deploy the folder as-is to GitHub Pages (index.html + css/ js/ assets/)."""
import base64, pathlib, re
r = pathlib.Path(__file__).parent
html = (r / 'index.html').read_text()
css = (r / 'css/style.css').read_text()
def inline(m):
    p = r / 'assets/scenes' / m.group(1)
    return 'url(data:image/webp;base64,' + base64.b64encode(p.read_bytes()).decode() + ')'
css = re.sub(r'url\(\.\./assets/scenes/([\w\-]+\.webp)\)', inline, css)
html = html.replace('<link rel="stylesheet" href="css/style.css">', '<style>' + css + '</style>')
html = html.replace('<script src="js/app.js"></script>', '<script>' + (r / 'js/app.js').read_text().replace("new Image().src = 'assets/scenes/' + n + '.webp';", "") + '</script>')
html = html.replace('<audio id="bgm" loop preload="none" src="assets/music/nadaswaram.mp3"></audio>', '<audio id="bgm" loop preload="none"></audio>')
(r / 'dist').mkdir(exist_ok=True)
(r / 'dist/invite.html').write_text(html)
print('built dist/invite.html', len(html) // 1024, 'KB')
