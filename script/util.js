class ObjectKeyMap extends Map {
    #serializer;

    constructor(serializer) {
        super();
        this.#serializer = serializer;
    }

    set(key, value) {
        return super.set(this.#serializer(key), value);
    }

    get(key) {
        return super.get(this.#serializer(key));
    }

    has(key) {
        return super.has(this.#serializer(key));
    }

    delete(key) {
        return super.delete(this.#serializer(key));
    }
}