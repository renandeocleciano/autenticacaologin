class Helpers {
    cutOff() : Number {
        var c = new Date();
        return c.setDate(c.getDate()-30);
    }
}

export default new Helpers();