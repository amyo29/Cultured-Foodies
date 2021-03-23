import React from "react";
import ReactDOM from "react-dom";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
//import { expect } from "chai";
var jsdom = require("mocha-jsdom");

import About from "./About";
import { API_INFO, TOOLS_INFO, TEAM_INFO } from "./AboutInfo";

/*
TODO: Things to test (once each): 
1) The whole About page
2) team cards  
3) Stats
 */

let rootContainer : any; 

beforeEach(() => {
    rootContainer = document.createElement("div");
    document.body.appendChild(rootContainer);
});

afterEach(() => {
    document.body.removeChild(rootContainer);
    rootContainer = null;
});

describe("", () => {
    it("Renders the About page", () => {
        // ensure that component is rendered and mounted
        act(() => {
            ReactDOM.render(<About />, rootContainer);
        }) 

    });
});
