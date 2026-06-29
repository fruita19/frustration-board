import { o as __toESM } from "../_runtime.mjs";
import { O as require_react, d as Link, f as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as fetchStudios, r as postVote, t as Route } from "./routes-Kf2qYx1N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BTZP8CEk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var sortStudios = (data, sortMode) => {
	return [...data].sort((a, b) => {
		if (sortMode === "+1 malejąco") return b.ups - a.ups;
		if (sortMode === "+1 rosnąco") return a.ups - b.ups;
		if (sortMode === "-1 malejąco") return b.downs - a.downs;
		return a.downs - b.downs;
	});
};
var LoginForm = ({ loginInput, setLoginInput, handleLogin }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "login-screen",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Zaloguj się" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: loginInput,
					onChange: (e) => setLoginInput(e.target.value),
					placeholder: "Twój login..."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handleLogin,
					children: "Wejdź"
				})
			]
		})
	});
};
var VoteButtons = ({ ups, downs, onVoteClick }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "vote-buttons",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			className: "btn-up",
			onClick: () => onVoteClick(1),
			children: ["👍 ", ups]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			className: "btn-down",
			onClick: () => onVoteClick(-1),
			children: ["👎 ", downs]
		})]
	});
};
var StudioRow = ({ studio, onOpenModal }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "studio-item",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/studio/$id",
			params: { id: String(studio.id) },
			className: "studio-name",
			children: studio.name
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoteButtons, {
			ups: studio.ups,
			downs: studio.downs,
			onVoteClick: (type) => onOpenModal(studio.id, type)
		})]
	});
};
var VoteNoteModal = ({ noteInput, setNoteInput, submitVote, onClose }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "modal-overlay",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "modal-content",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Dodaj notatkę (opcjonalnie)" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: noteInput,
					onChange: (e) => setNoteInput(e.target.value),
					placeholder: "Dlaczego taka ocena?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						marginTop: "15px",
						display: "flex",
						gap: "10px"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: submitVote,
						style: { flex: 1 },
						children: "Wyślij"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						style: {
							flex: 1,
							background: "#ccc"
						},
						children: "Anuluj"
					})]
				})
			]
		})
	});
};
function Home() {
	const initialData = Route.useLoaderData();
	const [studios, setStudios] = (0, import_react.useState)(initialData);
	const [sortMode, setSortMode] = (0, import_react.useState)("+1 malejąco");
	const [isLoggedIn, setIsLoggedIn] = (0, import_react.useState)(false);
	const [username, setUsername] = (0, import_react.useState)("");
	const [loginInput, setLoginInput] = (0, import_react.useState)("");
	const [showNoteModal, setShowNoteModal] = (0, import_react.useState)(false);
	const [pendingVote, setPendingVote] = (0, import_react.useState)(null);
	const [noteInput, setNoteInput] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		setStudios(sortStudios(initialData, sortMode));
	}, [sortMode, initialData]);
	const handleLogin = () => {
		if (["admin", "testuser"].includes(loginInput)) {
			setUsername(loginInput);
			setIsLoggedIn(true);
		} else alert("Nieznany użytkownik");
	};
	const handleOpenModal = (id, type) => {
		setPendingVote({
			id,
			type
		});
		setShowNoteModal(true);
	};
	const handleSubmitVote = async () => {
		if (!pendingVote) return;
		await postVote({
			studio_id: pendingVote.id,
			vote_type: pendingVote.type,
			user_name: username,
			note: noteInput
		});
		setNoteInput("");
		setShowNoteModal(false);
		setStudios(sortStudios(await fetchStudios(), sortMode));
	};
	if (!isLoggedIn) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginForm, {
		loginInput,
		setLoginInput,
		handleLogin
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "app-container",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "header-flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Ranking Studiów" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Cześć, ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: username }),
						"!"
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sort-section",
					children: ["Sortuj według:", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: sortMode,
						onChange: (e) => setSortMode(e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "+1 malejąco" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "+1 rosnąco" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "-1 malejąco" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "-1 rosnąco" })
						]
					})]
				}),
				studios.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioRow, {
					studio: s,
					onOpenModal: handleOpenModal
				}, s.id))
			]
		}), showNoteModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoteNoteModal, {
			noteInput,
			setNoteInput,
			submitVote: handleSubmitVote,
			onClose: () => setShowNoteModal(false)
		})]
	});
}
//#endregion
export { Home as component };
