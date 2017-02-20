import numeral from 'numeral'

class SubmitCountUtil {
    static formatSubmitCount(submitCount){
        if(submitCount < 10000){
            return numeral(submitCount).format('0,0');
        } else {
            return numeral(submitCount).format('0.0a');
        }
    }
}

export default SubmitCountUtil
