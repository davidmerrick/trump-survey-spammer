import {expect} from "chai";
import SubmitCountUtil from '../src/util/SubmitCountUtil'

describe("SubmitCountUtil Tests", () => {

    it("Test count under 1,000", () => {
        let submitCount = 575;
        let expected = "575";
        let actual = SubmitCountUtil.formatSubmitCount(submitCount);
        expect(expected).to.equal(actual);
    });

    it("Test count over 1,000, less than 10,000", () => {
        let submitCount = 5750;
        let expected = "5,750";
        let actual = SubmitCountUtil.formatSubmitCount(submitCount);
        expect(expected).to.equal(actual);
    });

    it("Test count over 10,000", () => {
        let submitCount = 15500;
        let expected = "15.5k";
        let actual = SubmitCountUtil.formatSubmitCount(submitCount);
        expect(expected).to.equal(actual);
    });
});

