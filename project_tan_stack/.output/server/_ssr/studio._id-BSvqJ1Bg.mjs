import { o as __toESM } from "../_runtime.mjs";
import { O as require_react, d as Link, f as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as axios } from "../_libs/axios+[...].mjs";
import { t as Route } from "./studio._id-BC4PkCVz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio._id-BSvqJ1Bg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StudioDetails() {
	const { id } = Route.useParams();
	const [history, setHistory] = (0, import_react.useState)([]);
	const [studioName, setStudioName] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const fetchDetails = async () => {
			try {
				const res = await axios.get(`http://localhost:3000/history/${id}`);
				setHistory(res.data);
				if (res.data.length > 0) setStudioName(res.data[0].studio_name || "Studio");
			} catch (err) {
				console.error("Błąd ładowania szczegółów", err);
			}
		};
		fetchDetails();
	}, [id]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "app-container",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					style: {
						display: "inline-block",
						marginBottom: "20px",
						color: "#0066cc",
						textDecoration: "none",
						fontWeight: "bold"
					},
					children: "← Powrót do rankingu"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					style: { textAlign: "center" },
					children: ["Historia: ", studioName]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: { marginTop: "20px" },
					children: history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							textAlign: "center",
							color: "#999"
						},
						children: "Brak głosów w historii dla tego studia."
					}) : history.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `history-item ${h.vote_type === 1 ? "positive" : "negative"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "history-meta",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: h.user_name }),
								" dał ",
								h.vote_type === 1 ? "👍" : "👎"
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: new Date(h.created_at).toLocaleString("pl-PL") })]
						}), h.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "history-note",
							children: h.note
						})]
					}, i))
				})
			]
		})
	});
}
//#endregion
export { StudioDetails as component };
