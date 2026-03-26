import { useMemo, useRef, useState } from "react";
import { MapPin, Search, Truck, Clock3, Phone, ShoppingBag, ChevronRight } from "lucide-react";
import { PRODUCTS } from "./data/products";
import { CONTACTS } from "./data/contacts";
import { BENEFITS } from "./data/benefits";
import { DISTRICTS } from "./data/districts";
import { STORES } from "./data/stores";

export default function App() {
  const storesSectionRef = useRef(null);
  const deliverySectionRef = useRef(null);
  const contactsSectionRef = useRef(null);

  const [query, setQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("Все районы");
  const [selectedStoreId, setSelectedStoreId] = useState(STORES[0]?.id ?? null);

  const filteredStores = useMemo(() => {
    return STORES.filter((store) => {
      const matchesDistrict = selectedDistrict === "Все районы" || store.district === selectedDistrict;
      const haystack = `${store.name} ${store.address} ${store.district}`.toLowerCase();
      const matchesQuery = !query || haystack.includes(query.toLowerCase());
      return matchesDistrict && matchesQuery;
    });
  }, [query, selectedDistrict]);

  const selectedStore =
    filteredStores.find((store) => store.id === selectedStoreId) || filteredStores[0] || STORES[0] || null;

  const scrollToRef = (ref) => {
    ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const callPhone = (phone) => {
    const cleanPhone = (phone || "").replace(/[^\d+]/g, "");
    if (!cleanPhone || cleanPhone === "+") return;
    window.location.href = `tel:${cleanPhone}`;
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-4 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80">
                Доставка и магазины по Якутску
              </div>
              <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
                <span className="text-red-500">МЯСО</span>
                <span className="text-yellow-400 lowercase">чные</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75 md:text-xl">
                Заказывайте доставку домой или находите ближайший магазин с нашей продукцией рядом с вами.
                Всё сделано так, чтобы покупатель быстро понял, где купить пельмени недалеко от дома.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToRef(contactsSectionRef)}
                  className="rounded-2xl bg-white px-6 py-3 text-base font-semibold text-black shadow-lg transition hover:scale-[1.02]"
                >
                  Заказать доставку
                </button>
                <button
                  onClick={() => scrollToRef(storesSectionRef)}
                  className="rounded-2xl border border-white/20 bg-white/5 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
                >
                  Найти ближайший магазин
                </button>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <button
                  onClick={() => scrollToRef(deliverySectionRef)}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10"
                >
                  <div className="flex items-center gap-2 text-2xl font-bold">
                    <Truck className="h-6 w-6" />
                    Доставка
                  </div>
                  <div className="mt-1 text-sm text-white/70">По городу и по заявке</div>
                </button>
                <button
                  onClick={() => scrollToRef(storesSectionRef)}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10"
                >
                  <div className="flex items-center gap-2 text-2xl font-bold">
                    <MapPin className="h-6 w-6" />
                    Магазины
                  </div>
                  <div className="mt-1 text-sm text-white/70">Список магазинов</div>
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {PRODUCTS.map((product) => (
                <button
                  key={product.name}
                  onClick={() => scrollToRef(contactsSectionRef)}
                  className="rounded-[24px] border border-white/10 bg-white/5 p-6 text-left shadow-2xl backdrop-blur transition hover:-translate-y-1 hover:bg-white/10"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                      {product.badge}
                    </div>
                    <ShoppingBag className="h-5 w-5 text-white/60" />
                  </div>
                  <div className="mb-4 h-28 rounded-2xl bg-gradient-to-br from-white/10 to-white/0" />
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/70">{product.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm text-white/75">
                    Заказать <ChevronRight className="h-4 w-4" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-xl">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">Для покупателей</p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">Купить можно так, как удобно именно вам</h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/75">
              Сайт должен сразу отвечать на два главных вопроса покупателя: где купить и как заказать.
              Поэтому главный упор сделан на доставку, поиск ближайшей точки и удобный список магазинов без лишних экранов.
            </p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-xl">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">Почему удобно</p>
            <div className="mt-5 space-y-4">
              {BENEFITS.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-black/20 p-4">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-white" />
                  <div className="text-sm leading-6 text-white/80">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={storesSectionRef} className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">Список магазинов</p>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              Где купить <span className="text-red-500">МЯСО</span>
              <span className="text-yellow-400 lowercase">чные</span> в Якутске
            </h2>
            <p className="mt-5 text-base leading-8 text-white/75">
              Без карты — только удобный список точек. Покупатель может выбрать район, ввести улицу или название магазина и сразу увидеть нужный адрес.
            </p>
          </div>

          <div className="mt-10 rounded-[30px] border border-white/10 bg-white/5 p-4 shadow-2xl md:p-6">
            <div className="mb-6 flex flex-col gap-3 lg:flex-row">
              <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <Search className="h-5 w-5 text-white/50" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Введите район, улицу или магазин"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {DISTRICTS.map((district) => {
                  const active = selectedDistrict === district;
                  return (
                    <button
                      key={district}
                      onClick={() => setSelectedDistrict(district)}
                      className={`rounded-2xl px-4 py-3 text-sm transition ${
                        active ? "bg-white text-black" : "border border-white/10 bg-black/20 text-white/75"
                      }`}
                    >
                      {district}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-5 rounded-[24px] border border-white/10 bg-black/20 p-5">
              <div className="text-sm uppercase tracking-[0.2em] text-white/45">Найдено магазинов</div>
              <div className="mt-2 text-3xl font-bold">{filteredStores.length}</div>
              <div className="mt-2 text-sm text-white/60">Выберите магазин из списка, чтобы посмотреть адрес и детали.</div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {filteredStores.map((store) => {
                const isActive = selectedStore?.id === store.id;
                return (
                  <button
                    key={store.id}
                    onClick={() => setSelectedStoreId(store.id)}
                    className={`rounded-[24px] border p-5 text-left transition ${
                      isActive
                        ? "border-white bg-white text-black"
                        : "border-white/10 bg-black/20 text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-lg font-semibold">{store.name}</div>
                        <div className={`mt-2 text-sm leading-6 ${isActive ? "text-black/70" : "text-white/65"}`}>
                          {store.address}
                        </div>
                      </div>
                      <div
                        className={`rounded-full px-3 py-1 text-xs ${
                          isActive ? "bg-black/10 text-black" : "border border-white/10 bg-white/5 text-white/70"
                        }`}
                      >
                        {store.district}
                      </div>
                    </div>
                    <div className={`mt-4 space-y-2 text-sm ${isActive ? "text-black/70" : "text-white/60"}`}>
                      <div className="flex items-start gap-2">
                        <Clock3 className="mt-0.5 h-4 w-4" />
                        <span>{store.hours}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="mt-0.5 h-4 w-4" />
                        <span>{store.phone}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section ref={deliverySectionRef} className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-xl">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">Доставка</p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">Заказ домой без лишних шагов</h2>
            <p className="mt-5 text-base leading-8 text-white/75">
              Для части покупателей удобнее доставка, чем поездка в магазин. Поэтому на сайте нужен отдельный заметный блок:
              оформить заказ, выбрать количество, оставить телефон и получить доставку по Якутску.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <button
                onClick={() => scrollToRef(contactsSectionRef)}
                className="rounded-2xl bg-black/20 p-5 text-left transition hover:bg-black/30"
              >
                <h3 className="text-lg font-semibold">Быстрый заказ</h3>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  Кнопка заказа в WhatsApp, Telegram или через форму на сайте.
                </p>
              </button>
              <button
                onClick={() => scrollToRef(storesSectionRef)}
                className="rounded-2xl bg-black/20 p-5 text-left transition hover:bg-black/30"
              >
                <h3 className="text-lg font-semibold">Удобная выдача</h3>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  Можно показать доставку, самовывоз и покупку в ближайшем магазине.
                </p>
              </button>
            </div>
          </div>

          <div
            ref={contactsSectionRef}
            className="rounded-[28px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 shadow-xl"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-white/60">Контакты</p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">Оформить заказ или узнать, где купить</h2>
            <p className="mt-5 text-base leading-8 text-white/80">
              Здесь можно разместить телефон, WhatsApp, Telegram и кнопку заказа. Эти данные меняются в файле contacts.js.
            </p>
            <div className="mt-8 space-y-4 text-sm text-white/80">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">Телефон: {CONTACTS.phone}</div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                WhatsApp / Telegram: {CONTACTS.whatsappTelegram}
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">{CONTACTS.delivery}</div>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => callPhone(CONTACTS.phone)}
                className="rounded-2xl bg-white px-6 py-3 text-base font-semibold text-black transition hover:scale-[1.02]"
              >
                Заказать сейчас
              </button>
              <button
                onClick={() => scrollToRef(storesSectionRef)}
                className="rounded-2xl border border-white/20 bg-white/5 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Открыть список магазинов
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
