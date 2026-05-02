(function () {
  const h = React.createElement;
  const data = window.SITE_DATA;
  const page = document.body.dataset.page || "home";
  const root = ReactDOM.createRoot(document.getElementById("root"));

  function asset(path) {
    return path;
  }

  function imgProps(src, alt, className) {
    return {
      src,
      alt,
      loading: "lazy",
      className,
      onError: (event) => {
        event.currentTarget.style.background = "linear-gradient(135deg, #101817, #12383F)";
      }
    };
  }

  function useReveal() {
    React.useEffect(() => {
      const items = document.querySelectorAll(".fade-in");
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.14, rootMargin: "0px 0px -70px 0px" });
      items.forEach((item) => observer.observe(item));
      return () => observer.disconnect();
    }, []);
  }

  function Nav() {
    return h("nav", { className: "fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-ink/55 backdrop-blur-xl" },
      h("div", { className: "mx-auto flex h-18 w-full max-w-6xl items-center justify-between px-5 py-4" },
        h("a", { href: asset("./index.html"), className: "font-display text-xl font-bold tracking-wide text-pearl" }, data.brand.name),
        h("div", { className: "hidden items-center gap-7 text-sm font-bold text-pearl/70 md:flex" },
          h("a", { href: asset("./index.html#experience"), className: "transition hover:text-gold" }, "Deneyim"),
          h("a", { href: asset("./menu.html"), className: "transition hover:text-gold" }, "Menü"),
          h("a", { href: asset("./qr.html"), className: "transition hover:text-gold" }, "QR"),
          h("a", { href: data.brand.phoneHref, className: "border border-gold/50 px-4 py-2 text-gold transition hover:bg-gold hover:text-ink" }, "Rezervasyon")
        ),
        h("a", { href: data.brand.phoneHref, className: "border border-gold/50 px-4 py-2 text-sm font-black text-gold transition hover:bg-gold hover:text-ink md:hidden" }, "Ara")
      )
    );
  }

  function Button({ href, children, variant = "primary", extra = "" }) {
    const base = "inline-flex min-h-14 items-center justify-center border px-6 text-sm font-black transition duration-300 hover:-translate-y-1";
    const styles = variant === "primary"
      ? "border-gold bg-gold text-ink shadow-[0_18px_55px_rgba(201,169,110,.22)] hover:shadow-[0_24px_70px_rgba(201,169,110,.32)]"
      : "border-gold/70 bg-ink/35 text-gold hover:bg-gold hover:text-ink";
    return h("a", { href, className: `${base} ${styles} ${extra}` }, children);
  }

  function SectionTitle({ eyebrow, title, text }) {
    return h("div", { className: "fade-in mb-10 grid gap-7 md:grid-cols-[.9fr_1fr] md:items-end" },
      h("div", null,
        h("p", { className: "mb-4 text-xs font-black uppercase tracking-[.22em] text-gold" }, eyebrow),
        h("h2", { className: "font-display text-5xl font-bold leading-none text-pearl md:text-7xl" }, title)
      ),
      h("p", { className: "max-w-2xl text-base leading-8 text-pearl/70" }, text)
    );
  }

  function Hero() {
    return h("header", {
      className: "relative flex min-h-screen items-center overflow-hidden bg-cover bg-center px-5 pt-24",
      style: { backgroundImage: `url('${data.images.hero}')` }
    },
      h("div", { className: "absolute inset-0 bg-black/55" }),
      h("div", { className: "absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" }),
      h("div", { className: "relative z-10 mx-auto w-full max-w-6xl" },
        h("div", { className: "fade-in max-w-5xl" },
          h("div", { className: "mb-6 inline-flex border border-gold/30 bg-ink/60 px-4 py-2 text-sm font-black text-pearl backdrop-blur-xl" },
            `⭐ ${data.brand.rating} · ${data.brand.reviews} Değerlendirme · ${data.brand.price}`
          ),
          h("h1", { className: "font-display text-6xl font-bold leading-none text-pearl md:text-8xl lg:text-9xl" },
            "Denize Sıfır Bodrum Sofrası"
          ),
          h("p", { className: "mt-7 max-w-2xl text-lg leading-8 text-pearl/78 md:text-xl" }, data.brand.tagline),
          h("div", { className: "mt-9 flex flex-col gap-3 sm:flex-row" },
            h(Button, { href: data.brand.phoneHref }, "Rezervasyon Yap"),
            h(Button, { href: asset("./menu.html"), variant: "secondary" }, "Dijital Menüyü Aç"),
            h(Button, { href: asset("./qr.html"), variant: "secondary" }, "QR Sayfası")
          )
        )
      )
    );
  }

  function InfoStrip() {
    const items = [
      ["Konum", data.brand.address],
      ["Saatler", data.brand.hours],
      ["Telefon", data.brand.phoneDisplay],
      ["Hızlı Erişim", "Menü · Instagram · Website"]
    ];
    return h("section", { className: "border-y border-gold/10 bg-ink px-5 py-5" },
      h("div", { className: "mx-auto grid max-w-6xl gap-3 md:grid-cols-4" },
        items.map(([label, value]) => h("div", { key: label, className: "fade-in glass border border-gold/15 p-5 shadow-2xl" },
          h("span", { className: "text-xs font-black uppercase tracking-[.18em] text-gold/80" }, label),
          h("p", { className: "mt-2 text-sm font-bold leading-6 text-pearl" }, value)
        ))
      )
    );
  }

  function Experience() {
    return h("section", { id: "experience", className: "bg-night px-5 py-24" },
      h("div", { className: "mx-auto max-w-6xl" },
        h(SectionTitle, {
          eyebrow: "Bodrum kıyısında",
          title: "Sakin Lüks, Gerçek Manzara",
          text: "Mekan görselleri Yalı Kıyı'nın gerçek deniz kenarı atmosferinden, menü görselleri ise premium ve isimleriyle uyumlu profesyonel yemek fotoğraflarından seçildi."
        }),
        h("div", { className: "fade-in grid min-h-[560px] gap-4 lg:grid-cols-[1fr_.72fr]" },
          h("img", imgProps(data.images.venue[0].src, data.images.venue[0].alt, "h-full min-h-[420px] w-full border border-gold/15 object-cover")),
          h("div", { className: "grid gap-4" },
            h("img", imgProps(data.images.venue[1].src, data.images.venue[1].alt, "h-full min-h-[260px] w-full border border-gold/15 object-cover")),
            h("img", imgProps(data.images.venue[2].src, data.images.venue[2].alt, "h-full min-h-[260px] w-full border border-gold/15 object-cover"))
          )
        )
      )
    );
  }

  function FeaturedMenu() {
    return h("section", { className: "bg-ink px-5 py-24" },
      h("div", { className: "mx-auto max-w-6xl" },
        h(SectionTitle, {
          eyebrow: "Homepage menü",
          title: "Öne Çıkan Lezzetler",
          text: "Balık, meze, ahtapot ve kalamar odağında, sade ama iştah açıcı bir seçki."
        }),
        h("div", { className: "grid gap-5 md:grid-cols-2 lg:grid-cols-4" },
          data.featured.map((item) => h("article", { key: item.name, className: "fade-in group overflow-hidden border border-gold/15 bg-night shadow-2xl transition duration-300 hover:-translate-y-2 hover:border-gold/50" },
            h("img", imgProps(item.image, item.alt, "aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105")),
            h("div", { className: "p-6" },
              h("div", { className: "mb-5 h-[2px] w-12 bg-gold" }),
              h("h3", { className: "font-display text-2xl font-bold text-pearl" }, item.name),
              h("p", { className: "mt-3 text-sm leading-6 text-pearl/68" }, item.description)
            )
          ))
        ),
        h("div", { className: "mt-10 flex justify-center" },
          h(Button, { href: asset("./menu.html") }, "Tüm Dijital Menüyü Gör")
        )
      )
    );
  }

  function Reviews() {
    return h("section", { className: "bg-night px-5 py-24" },
      h("div", { className: "mx-auto max-w-6xl" },
        h(SectionTitle, {
          eyebrow: "Sosyal kanıt",
          title: "Misafirlerimiz Anlatıyor",
          text: "Yorumlarda meze, balık, ahtapot, yerli kalamar ve deniz kenarı atmosferi öne çıkıyor."
        }),
        h("div", { className: "grid gap-5 md:grid-cols-3" },
          data.reviews.map((review) => h("article", { key: review.name, className: "fade-in border-l-4 border-gold bg-ink p-7 shadow-2xl" },
            h("p", { className: "font-display text-2xl leading-tight text-pearl/90" }, `"${review.quote}"`),
            h("strong", { className: "mt-6 block text-sm font-black text-gold" }, `${review.name} · ⭐⭐⭐⭐⭐`)
          ))
        )
      )
    );
  }

  function Reservation() {
    return h("section", {
      className: "relative overflow-hidden bg-cover bg-center px-5 py-28 text-center",
      style: { backgroundImage: `url('${data.images.reservation}')` }
    },
      h("div", { className: "absolute inset-0 bg-black/55" }),
      h("div", { className: "relative z-10 mx-auto flex max-w-4xl flex-col items-center" },
        h("p", { className: "mb-4 text-xs font-black uppercase tracking-[.22em] text-gold" }, "Rezervasyon"),
        h("h2", { className: "font-display text-5xl font-bold leading-none text-pearl md:text-7xl" }, "Gün Batımı İçin Masanızı Ayırtın"),
        h("p", { className: "mt-6 max-w-2xl text-lg leading-8 text-pearl/75" }, "Deniz kenarında soğuk meze, ahtapot, yerli kalamar ve günlük balık için hemen ulaşın."),
        h("div", { className: "mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row" },
          h(Button, { href: data.brand.phoneHref, extra: "w-full sm:w-auto" }, `Ara: ${data.brand.phoneDisplay}`),
          h(Button, { href: data.brand.mapsUrl, variant: "secondary", extra: "w-full sm:w-auto" }, "Yol Tarifi Al")
        )
      )
    );
  }

  function Footer() {
    return h("footer", { className: "border-t border-gold/15 bg-ink px-5 py-12" },
      h("div", { className: "mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.2fr_1fr_.8fr]" },
        h("div", null,
          h("h2", { className: "font-display text-4xl font-bold text-pearl" }, data.brand.name),
          h("p", { className: "mt-3 text-sm leading-7 text-pearl/65" }, data.brand.tagline)
        ),
        h("div", { className: "text-sm leading-7 text-pearl/65" },
          h("p", null, data.brand.address),
          h("p", null, data.brand.hours),
          h("a", { href: data.brand.phoneHref, className: "font-bold text-gold" }, data.brand.phoneDisplay)
        ),
        h("div", { className: "flex flex-col gap-3" },
          h(Button, { href: data.brand.instagramUrl, variant: "secondary" }, data.brand.instagram),
          h(Button, { href: asset("./qr.html"), variant: "secondary" }, "QR Landing")
        )
      ),
      h("div", { className: "mx-auto mt-10 max-w-6xl border-t border-gold/10 pt-6 text-xs text-pearl/45" }, `© 2026 ${data.brand.name}`)
    );
  }

  function HomePage() {
    useReveal();
    return h(React.Fragment, null,
      h(Nav),
      h(Hero),
      h(InfoStrip),
      h(Experience),
      h(FeaturedMenu),
      h(Reviews),
      h(Reservation),
      h(Footer)
    );
  }

  function MenuPage() {
    useReveal();
    return h(React.Fragment, null,
      h(Nav),
      h("main", { className: "bg-ink px-5 pt-32" },
        h("section", { className: "mx-auto max-w-6xl pb-14" },
          h("p", { className: "mb-4 text-xs font-black uppercase tracking-[.22em] text-gold" }, "Dijital menü"),
          h("h1", { className: "font-display text-6xl font-bold leading-none text-pearl md:text-8xl" }, "Menü"),
          h("p", { className: "mt-6 max-w-2xl text-lg leading-8 text-pearl/70" }, "Bu yapı tek config dosyasından yönetilir; kategori, ürün adı, açıklama ve görsel kolayca güncellenebilir."),
          h("div", { className: "mt-8 flex flex-wrap gap-3" },
            data.menuCategories.map((cat) => h("a", { key: cat.title, href: `#${cat.title}`, className: "border border-gold/25 px-4 py-2 text-sm font-black text-gold transition hover:bg-gold hover:text-ink" }, cat.title))
          )
        ),
        data.menuCategories.map((cat) => h("section", { key: cat.title, id: cat.title, className: "mx-auto max-w-6xl border-t border-gold/10 py-14" },
          h("h2", { className: "fade-in font-display text-4xl font-bold text-pearl md:text-5xl" }, cat.title),
          h("div", { className: "mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3" },
            cat.items.map((item) => h("article", { key: `${cat.title}-${item.name}`, className: "fade-in overflow-hidden border border-gold/15 bg-night shadow-2xl transition duration-300 hover:-translate-y-1 hover:border-gold/45" },
              h("img", imgProps(item.image, item.name, "aspect-[4/3] w-full object-cover")),
              h("div", { className: "p-6" },
                h("h3", { className: "font-display text-2xl font-bold text-pearl" }, item.name),
                h("p", { className: "mt-3 text-sm leading-6 text-pearl/68" }, item.description)
              )
            ))
          )
        ))
      ),
      h(Footer)
    );
  }

  function QRPage() {
    const links = [
      ["📖", "Menü", "Dijital menüyü aç", asset("./menu.html")],
      ["📸", "Instagram", data.brand.instagram, data.brand.instagramUrl],
      ["🌐", "Website", "Ana siteye dön", asset("./index.html")]
    ];
    return h("main", {
      className: "relative flex min-h-screen items-center justify-center overflow-hidden bg-cover bg-center px-5 py-10",
      style: { backgroundImage: `url('${data.images.hero}')` }
    },
      h("div", { className: "absolute inset-0 bg-black/60" }),
      h("section", { className: "glass relative z-10 w-full max-w-md border border-gold/20 p-7 shadow-2xl" },
        h("p", { className: "text-center text-xs font-black uppercase tracking-[.22em] text-gold" }, "QR hızlı erişim"),
        h("h1", { className: "mt-4 text-center font-display text-5xl font-bold leading-none text-pearl" }, data.brand.shortName),
        h("p", { className: "mx-auto mt-4 max-w-xs text-center text-sm leading-6 text-pearl/70" }, "Menü, Instagram ve web sitesine tek dokunuşla ulaşın."),
        h("div", { className: "mt-8 grid gap-3" },
          links.map(([icon, title, text, href]) => h("a", { key: title, href, className: "flex min-h-20 items-center gap-4 border border-gold/20 bg-ink/55 px-5 py-4 transition hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-ink" },
            h("span", { className: "text-3xl", "aria-hidden": "true" }, icon),
            h("span", null,
              h("strong", { className: "block text-lg font-black" }, title),
              h("small", { className: "block text-sm opacity-75" }, text)
            )
          ))
        ),
        h("a", { href: data.brand.phoneHref, className: "mt-6 flex min-h-14 items-center justify-center bg-gold px-6 text-sm font-black text-ink transition hover:-translate-y-1" }, `Rezervasyon: ${data.brand.phoneDisplay}`)
      )
    );
  }

  const pages = { home: HomePage, menu: MenuPage, qr: QRPage };
  root.render(h(pages[page] || HomePage));
}());
