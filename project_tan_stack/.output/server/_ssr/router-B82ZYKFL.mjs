import { f as require_jsx_runtime, i as ScrollRestoration, n as Scripts, o as createRouter, r as HeadContent, s as Outlet, u as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$1 } from "./routes-Kf2qYx1N.mjs";
import { t as Route$2 } from "./studio._id-BC4PkCVz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-B82ZYKFL.js
var import_jsx_runtime = require_jsx_runtime();
var Route = createRootRoute({
	head: () => ({ meta: [
		{ charSet: "utf-8" },
		{
			name: "viewport",
			content: "width=device-width, initial-scale=1"
		},
		{ title: "Frustration Board" }
	] }),
	component: RootComponent
});
function RootComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "pl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollRestoration, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var rootRouteChildren = {
	IndexRoute: Route$1.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route
	}),
	StudioIdRoute: Route$2.update({
		id: "/studio/$id",
		path: "/studio/$id",
		getParentRoute: () => Route
	})
};
var routeTree = Route._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
	return createRouter({
		routeTree,
		defaultPreload: "intent"
	});
}
//#endregion
export { getRouter };
