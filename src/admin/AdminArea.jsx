import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, Navigate, NavLink, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import {
  Archive,
  ArrowLeft,
  Check,
  FilePenLine,
  Inbox,
  LayoutDashboard,
  Loader2,
  LogOut,
  Mail,
  Save,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { adminApi, csrfConfig } from "@/admin/api";
import { Toaster } from "@/components/ui/sonner";

const inputClass = "mt-1 w-full rounded-xl border border-[#D9D2C7] bg-white px-3 py-2.5 text-sm text-[#2C2A29] outline-none transition focus:border-[#73856F] focus:ring-2 focus:ring-[#73856F]/20";
const labelClass = "block text-sm font-medium text-[#403B37]";

function useAdminSession() {
  return useQuery({
    queryKey: ["admin-session"],
    queryFn: async () => (await adminApi.get("/admin/auth/me")).data,
    retry: false,
  });
}

function PageLoading() {
  return <main className="grid min-h-screen place-items-center bg-[#F6F2EB] text-[#524E4A]"><Loader2 className="h-6 w-6 animate-spin" /></main>;
}

function RequireAdmin() {
  const session = useAdminSession();
  if (session.isLoading) return <PageLoading />;
  if (session.isError) return <Navigate to="/admin/login" replace />;
  return <AdminShell user={session.data} />;
}

function AdminShell({ user }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const logout = useMutation({
    mutationFn: () => adminApi.post("/admin/auth/logout", {}, csrfConfig()),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["admin-session"] });
      navigate("/admin/login", { replace: true });
    },
  });

  const navigation = [
    ["Resumen", "/admin", LayoutDashboard],
    ["Contenido", "/admin/contenido", FilePenLine],
    ["Mensajes", "/admin/mensajes", Inbox],
  ];

  return (
    <div className="min-h-screen bg-[#F6F2EB] text-[#2C2A29]">
      <header className="border-b border-[#DED6CA] bg-[#FAF7F2]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-8">
          <Link to="/admin" className="font-serif text-2xl text-[#2D4030]">Alejandra <span className="italic">· administración</span></Link>
          <div className="flex items-center gap-3 text-sm text-[#625D56]">
            <span className="hidden sm:inline">{user.email}</span>
            <button onClick={() => logout.mutate()} disabled={logout.isPending} className="inline-flex items-center gap-2 rounded-full border border-[#D9D2C7] px-3 py-2 hover:bg-white disabled:opacity-50">
              <LogOut className="h-4 w-4" /> Salir
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-8 lg:grid-cols-[13rem_1fr]">
        <nav className="flex gap-2 overflow-x-auto lg:flex-col" aria-label="Administración">
          {navigation.map(([label, path, Icon]) => (
            <NavLink key={path} to={path} end={path === "/admin"} className={({ isActive }) => `inline-flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${isActive ? "bg-[#2D4030] text-[#FAF7F2]" : "text-[#524E4A] hover:bg-white"}`}>
              <Icon className="h-4 w-4" />{label}
            </NavLink>
          ))}
          <Link to="/" className="mt-0 inline-flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm text-[#625D56] hover:bg-white lg:mt-4"><ArrowLeft className="h-4 w-4" /> Ver web</Link>
        </nav>
        <main><Outlet /></main>
      </div>
    </div>
  );
}

function AdminLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const session = useAdminSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useMutation({
    mutationFn: () => adminApi.post("/admin/auth/login", { email, password }),
    onSuccess: (response) => {
      queryClient.setQueryData(["admin-session"], response.data);
      navigate("/admin", { replace: true });
    },
    onError: () => toast.error("No se ha podido iniciar sesión. Revisa tus datos."),
  });
  if (session.isLoading) return <PageLoading />;
  if (session.isSuccess) return <Navigate to="/admin" replace />;

  return (
    <main className="grid min-h-screen place-items-center bg-[#2D4030] px-4 py-10">
      <form onSubmit={(event) => { event.preventDefault(); login.mutate(); }} className="w-full max-w-md rounded-3xl bg-[#FAF7F2] p-7 shadow-2xl sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8A9A86]">Administración</p>
        <h1 className="mt-3 font-serif text-4xl text-[#2D4030]">Bienvenida</h1>
        <p className="mt-3 text-sm leading-relaxed text-[#625D56]">Accede para gestionar el contenido y los mensajes recibidos.</p>
        <label className={`${labelClass} mt-7`}>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className={inputClass} autoComplete="email" /></label>
        <label className={`${labelClass} mt-5`}>Contraseña<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={12} className={inputClass} autoComplete="current-password" /></label>
        <button disabled={login.isPending} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#C86D51] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#B25C42] disabled:opacity-60">
          {login.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Entrar
        </button>
        <Link to="/" className="mt-6 block text-center text-sm text-[#625D56] underline underline-offset-4">Volver a la web</Link>
      </form>
    </main>
  );
}

function useMessages(status) {
  return useQuery({
    queryKey: ["admin-messages", status],
    queryFn: async () => (await adminApi.get("/admin/messages", { params: status ? { status } : {} })).data,
  });
}

function AdminDashboard() {
  const messages = useMessages();
  const totals = useMemo(() => ({ unread: messages.data?.filter((message) => message.status === "unread").length ?? 0, read: messages.data?.filter((message) => message.status === "read").length ?? 0, archived: messages.data?.filter((message) => message.status === "archived").length ?? 0 }), [messages.data]);
  if (messages.isLoading) return <PanelLoading />;
  if (messages.isError) return <PanelError />;
  return <>
    <PageHeading eyebrow="Resumen" title="Tu espacio de trabajo" description="Gestiona el contenido de la web y atiende las consultas recibidas." />
    <div className="grid gap-4 sm:grid-cols-3">
      <Stat icon={Mail} label="Sin leer" value={totals.unread} tone="coral" />
      <Stat icon={Check} label="Leídos" value={totals.read} tone="green" />
      <Stat icon={Archive} label="Archivados" value={totals.archived} tone="neutral" />
    </div>
    <section className="mt-8 rounded-3xl border border-[#DED6CA] bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="font-serif text-2xl text-[#2D4030]">Empieza por aquí</h2><p className="mt-1 text-sm text-[#625D56]">Los cambios de contenido se guardan de forma segura.</p></div><Link to="/admin/contenido" className="rounded-full bg-[#2D4030] px-5 py-3 text-sm font-semibold text-white hover:bg-[#203123]">Editar contenido</Link></div>
    </section>
  </>;
}

function AdminMessages() {
  const [statusFilter, setStatusFilter] = useState("");
  const messages = useMessages(statusFilter || undefined);
  const queryClient = useQueryClient();
  const refresh = () => queryClient.invalidateQueries({ queryKey: ["admin-messages"] });
  const changeStatus = useMutation({ mutationFn: ({ id, status }) => adminApi.patch(`/admin/messages/${id}`, { status }, csrfConfig()), onSuccess: refresh, onError: () => toast.error("No se pudo actualizar el mensaje.") });
  const remove = useMutation({ mutationFn: (id) => adminApi.delete(`/admin/messages/${id}`, csrfConfig()), onSuccess: refresh, onError: () => toast.error("No se pudo eliminar el mensaje.") });
  return <>
    <PageHeading eyebrow="Mensajes" title="Consultas recibidas" description="Gestiona cada conversación con cuidado y archiva lo que ya esté resuelto." />
    <div className="mb-5 flex flex-wrap gap-2">{[["", "Todos"], ["unread", "Sin leer"], ["read", "Leídos"], ["archived", "Archivados"]].map(([value, label]) => <button key={value} onClick={() => setStatusFilter(value)} className={`rounded-full px-4 py-2 text-sm ${statusFilter === value ? "bg-[#2D4030] text-white" : "bg-white text-[#524E4A] ring-1 ring-[#DED6CA]"}`}>{label}</button>)}</div>
    {messages.isLoading ? <PanelLoading /> : messages.isError ? <PanelError /> : <div className="space-y-4">{messages.data.length === 0 ? <EmptyMessages /> : messages.data.map((message) => <article key={message.id} className="rounded-2xl border border-[#DED6CA] bg-white p-5 sm:p-6"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="font-semibold text-[#2D4030]">{message.name}</p><a href={`mailto:${message.email}`} className="text-sm text-[#687B64] hover:underline">{message.email}</a></div><StatusBadge status={message.status} /></div><p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-[#524E4A]">{message.message}</p><div className="mt-5 flex flex-wrap gap-2 border-t border-[#EEE9E1] pt-4"><button onClick={() => changeStatus.mutate({ id: message.id, status: "read" })} className="rounded-full border border-[#D9D2C7] px-3 py-2 text-xs font-semibold hover:bg-[#F6F2EB]">Marcar leído</button><button onClick={() => changeStatus.mutate({ id: message.id, status: "archived" })} className="rounded-full border border-[#D9D2C7] px-3 py-2 text-xs font-semibold hover:bg-[#F6F2EB]">Archivar</button><button onClick={() => { if (window.confirm("¿Eliminar este mensaje definitivamente?")) remove.mutate(message.id); }} className="ml-auto inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold text-[#B7543C] hover:bg-[#FFF2EF]"><Trash2 className="h-3.5 w-3.5" /> Eliminar</button></div></article>)}</div>}
  </>;
}

function AdminContent() {
  const contentQuery = useQuery({ queryKey: ["admin-homepage"], queryFn: async () => (await adminApi.get("/admin/content/homepage")).data });
  const [content, setContent] = useState(null);
  useEffect(() => { if (contentQuery.data?.data) setContent(contentQuery.data.data); }, [contentQuery.data]);
  const save = useMutation({ mutationFn: () => adminApi.put("/admin/content/homepage", { data: content }, csrfConfig()), onSuccess: (response) => { setContent(response.data.data); toast.success("Contenido guardado."); }, onError: () => toast.error("No se pudo guardar. Revisa que los campos obligatorios estén completos.") });
  const update = (path, value) => setContent((previous) => { const next = structuredClone(previous); const parts = path.split("."); const last = parts.pop(); let target = next; parts.forEach((part) => { target = target[part]; }); target[last] = value; return next; });
  const listUpdate = (path, value) => update(path, value.split("\n").map((item) => item.trim()).filter(Boolean));
  if (contentQuery.isLoading || !content) return <PanelLoading />;
  if (contentQuery.isError) return <PanelError />;
  return <form onSubmit={(event) => { event.preventDefault(); save.mutate(); }}>
    <PageHeading eyebrow="Contenido" title="Editar la web" description="Los cambios se validan antes de publicarse. No es necesario trabajar con JSON." action={<button disabled={save.isPending} className="inline-flex items-center gap-2 rounded-full bg-[#C86D51] px-5 py-3 text-sm font-semibold text-white hover:bg-[#B25C42] disabled:opacity-60">{save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Guardar cambios</button>} />
    <div className="space-y-6">
      <EditorSection title="Identidad y navegación"><Field label="Nombre" value={content.brand.name} onChange={(value) => update("brand.name", value)} /><Field label="Texto del botón de navegación" value={content.navigation.cta} onChange={(value) => update("navigation.cta", value)} />{content.navigation.links.map((link, index) => <div key={index} className="grid gap-3 rounded-xl bg-[#F6F2EB] p-4 sm:grid-cols-2"><Field label={`Enlace ${index + 1}`} value={link.label} onChange={(value) => update(`navigation.links.${index}.label`, value)} /><Field label="Destino" value={link.href} onChange={(value) => update(`navigation.links.${index}.href`, value)} /></div>)}</EditorSection>
      <EditorSection title="Portada"><Field label="Antetítulo" value={content.hero.badge} onChange={(value) => update("hero.badge", value)} /><TextArea label="Titular · una línea por renglón" value={content.hero.titleLines.join("\n")} onChange={(value) => listUpdate("hero.titleLines", value)} /><TextArea label="Texto de presentación" value={content.hero.subtitle} onChange={(value) => update("hero.subtitle", value)} /><div className="grid gap-4 sm:grid-cols-2"><Field label="Botón principal" value={content.hero.primaryCta} onChange={(value) => update("hero.primaryCta", value)} /><Field label="Botón secundario" value={content.hero.secondaryCta} onChange={(value) => update("hero.secondaryCta", value)} /><Field label="Experiencia" value={content.hero.experience} onChange={(value) => update("hero.experience", value)} /><Field label="Etiqueta de experiencia" value={content.hero.experienceLabel} onChange={(value) => update("hero.experienceLabel", value)} /></div><TextArea label="Nota de confianza" value={content.hero.trustNote} onChange={(value) => update("hero.trustNote", value)} /><Field label="URL de imagen" value={content.hero.imageUrl} onChange={(value) => update("hero.imageUrl", value)} /><Field label="Descripción de imagen" value={content.hero.imageAlt} onChange={(value) => update("hero.imageAlt", value)} /></EditorSection>
      <EditorSection title="Sobre mí"><div className="grid gap-4 sm:grid-cols-2"><Field label="Antetítulo" value={content.about.eyebrow} onChange={(value) => update("about.eyebrow", value)} /><Field label="Nombre destacado" value={content.about.titleAccent} onChange={(value) => update("about.titleAccent", value)} /></div><TextArea label="Biografía · primer párrafo" value={content.about.bioFirst} onChange={(value) => update("about.bioFirst", value)} /><TextArea label="Biografía · segundo párrafo" value={content.about.bioSecond} onChange={(value) => update("about.bioSecond", value)} /><TextArea label="Enfoques · uno por línea" value={content.about.keywords.join("\n")} onChange={(value) => listUpdate("about.keywords", value)} /><Field label="URL de imagen" value={content.about.imageUrl} onChange={(value) => update("about.imageUrl", value)} /></EditorSection>
      <EditorSection title="Servicios">{content.services.items.map((service, index) => <div key={index} className="space-y-3 rounded-2xl border border-[#E9E3D9] p-4"><Field label={`Servicio ${index + 1}`} value={service.title} onChange={(value) => update(`services.items.${index}.title`, value)} /><TextArea label="Descripción" value={service.description} onChange={(value) => update(`services.items.${index}.description`, value)} /></div>)}</EditorSection>
      <EditorSection title="Testimonios">{content.testimonials.items.map((testimonial, index) => <div key={index} className="space-y-3 rounded-2xl border border-[#E9E3D9] p-4"><div className="grid gap-4 sm:grid-cols-2"><Field label="Iniciales" value={testimonial.initials} onChange={(value) => update(`testimonials.items.${index}.initials`, value)} /><Field label="Tema" value={testimonial.tag} onChange={(value) => update(`testimonials.items.${index}.tag`, value)} /></div><TextArea label="Testimonio" value={testimonial.quote} onChange={(value) => update(`testimonials.items.${index}.quote`, value)} /></div>)}</EditorSection>
      <EditorSection title="Contacto y pie"><div className="grid gap-4 sm:grid-cols-2"><Field label="Email" value={content.contact.email} onChange={(value) => update("contact.email", value)} /><Field label="Teléfono" value={content.contact.phone} onChange={(value) => update("contact.phone", value)} /></div><Field label="Ubicación" value={content.contact.location} onChange={(value) => update("contact.location", value)} /><TextArea label="Texto de contacto" value={content.contact.intro} onChange={(value) => update("contact.intro", value)} /><TextArea label="Descripción del pie" value={content.footer.description} onChange={(value) => update("footer.description", value)} /><Field label="Copyright" value={content.footer.copyright} onChange={(value) => update("footer.copyright", value)} /></EditorSection>
    </div>
  </form>;
}

function PageHeading({ eyebrow, title, description, action }) { return <header className="mb-8 flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#798C74]">{eyebrow}</p><h1 className="mt-2 font-serif text-4xl text-[#2D4030] sm:text-5xl">{title}</h1><p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#625D56] sm:text-base">{description}</p></div>{action}</header>; }
function EditorSection({ title, children }) { return <section className="space-y-4 rounded-3xl border border-[#DED6CA] bg-white p-5 sm:p-7"><h2 className="font-serif text-2xl text-[#2D4030]">{title}</h2>{children}</section>; }
function Field({ label, value, onChange }) { return <label className={labelClass}>{label}<input value={value ?? ""} onChange={(event) => onChange(event.target.value)} className={inputClass} /></label>; }
function TextArea({ label, value, onChange }) { return <label className={labelClass}>{label}<textarea value={value ?? ""} onChange={(event) => onChange(event.target.value)} className={`${inputClass} min-h-28 resize-y`} /></label>; }
function Stat({ icon: Icon, label, value, tone }) { const tones = { coral: "bg-[#FFF0EB] text-[#B7543C]", green: "bg-[#EDF4EA] text-[#456241]", neutral: "bg-[#F1EEE9] text-[#625D56]" }; return <div className="rounded-2xl border border-[#DED6CA] bg-white p-5"><div className={`inline-flex rounded-xl p-2 ${tones[tone]}`}><Icon className="h-5 w-5" /></div><p className="mt-4 text-3xl font-semibold text-[#2D4030]">{value}</p><p className="mt-1 text-sm text-[#625D56]">{label}</p></div>; }
function StatusBadge({ status }) { const labels = { unread: "Sin leer", read: "Leído", archived: "Archivado" }; const styles = { unread: "bg-[#FFF0EB] text-[#A54C36]", read: "bg-[#EDF4EA] text-[#456241]", archived: "bg-[#F1EEE9] text-[#625D56]" }; return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>{labels[status]}</span>; }
function PanelLoading() { return <div className="grid min-h-52 place-items-center rounded-3xl border border-[#DED6CA] bg-white"><Loader2 className="h-6 w-6 animate-spin text-[#687B64]" /></div>; }
function PanelError() { return <div className="rounded-3xl border border-[#E7C6BB] bg-[#FFF8F5] p-6 text-sm text-[#8D432F]">No se han podido cargar estos datos. Comprueba que la sesión sigue activa.</div>; }
function EmptyMessages() { return <div className="rounded-3xl border border-dashed border-[#D9D2C7] bg-white p-10 text-center"><Mail className="mx-auto h-7 w-7 text-[#8A9A86]" /><p className="mt-4 font-serif text-2xl text-[#2D4030]">Aún no hay mensajes</p><p className="mt-2 text-sm text-[#625D56]">Las consultas del formulario aparecerán aquí.</p></div>; }

export function AdminArea() {
  return <>
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route element={<RequireAdmin />}>
        <Route index element={<AdminDashboard />} />
        <Route path="contenido" element={<AdminContent />} />
        <Route path="mensajes" element={<AdminMessages />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
    <Toaster position="top-center" richColors />
  </>;
}
