import re

with open("index.html", "r") as f:
    content = f.read()

# 1. Hero Description
content = re.sub(
    r'<p class="hero__description reveal">.*?</p>',
    '<p class="hero__description reveal">\n            Hi, I\'m Kaustubh, a student and passionate software developer. I excel at breaking down complex problems and building efficient software — from low-level systems in C++ to full-stack applications in JavaScript and Python.\n          </p>',
    content,
    flags=re.DOTALL
)

# 2. About Description
about_text_new = """<div class="about__text reveal">
          <p>
            I am a software developer with a background that has prepared me to be an effective problem solver and communicator. My experience spans systems-level programming in C++, data-driven applications in Python, and interactive web experiences with JavaScript.
          </p>
          <p>
            I approach complex challenges systematically, whether it's processing bank transactions, exploring movie databases, or building real-time text applications. I am equipped with a strong technical toolkit and I'm always ready to tackle new challenges.
          </p>
          <p>
            When I'm not coding, I enjoy exploring new technologies and continuously expanding my skill set.
          </p>
        </div>"""
content = re.sub(
    r'<div class="about__text reveal">.*?</div>\s*<div class="about__skills reveal">',
    about_text_new + '\n\n        <div class="about__skills reveal">',
    content,
    flags=re.DOTALL
)

# 3. Experience Section
exp_text_new = """<div class="experience__list stagger">
        <div class="experience-item reveal">
          <span class="experience-item__date">TBD</span>
          <h3 class="experience-item__role">Lab Work & Internships</h3>
          <span class="experience-item__company">
            <span class="status-dot">Actively seeking opportunities</span>
          </span>
          <p class="experience-item__description">
            I am currently seeking lab work and software engineering internships to apply my skills in real-world environments. Check back soon for updates on my professional experience!
          </p>
        </div>
      </div>"""
content = re.sub(
    r'<div class="experience__list stagger">.*?</div>\s*</div>\s*</section>',
    exp_text_new + '\n    </div>\n  </section>',
    content,
    flags=re.DOTALL
)

# 4. Footer Year
content = content.replace("· 2025", "· 2026")

# 5. Make Project Cards clickable links
def repl_project(m):
    # m.group(0) is the whole article
    inner = m.group(0)
    # Extract the href from the link inside
    href_m = re.search(r'<a href="([^"]+)"[^>]*class="project-card__link"[^>]*>', inner)
    href = href_m.group(1) if href_m else "#"
    
    # Change <article ...> to <a href="..." target="_blank" rel="noopener noreferrer" class="project-card reveal" style="text-decoration:none; color:inherit;">
    inner = re.sub(r'<article class="project-card reveal">', f'<a href="{href}" target="_blank" rel="noopener noreferrer" class="project-card reveal" style="text-decoration:none; color:inherit;">', inner)
    # Change </article> to </a>
    inner = re.sub(r'</article>', '</a>', inner)
    
    # Remove the anchor tag around the SVG inside project-card__links
    inner = re.sub(r'<a href="[^"]+"[^>]*class="project-card__link"[^>]*>\s*(<svg.*?</svg>)\s*</a>', r'\1', inner, flags=re.DOTALL)
    
    return inner

content = re.sub(r'<article class="project-card reveal">.*?</article>', repl_project, content, flags=re.DOTALL)

with open("index.html", "w") as f:
    f.write(content)

print("index.html updated successfully!")
