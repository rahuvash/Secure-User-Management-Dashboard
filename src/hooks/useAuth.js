"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = void 0;
var react_redux_1 = require("react-redux");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var useAuth = function () {
    var token = (0, react_redux_1.useSelector)(function (state) { return state.auth.token; });
    var navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(function () {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);
    return token;
};
exports.useAuth = useAuth;
