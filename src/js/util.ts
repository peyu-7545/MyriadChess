export class ObjectKeyMap<Key_t, Val_t> extends Map {
    #serializer;

    constructor(serializer: (obj: Key_t) => string) {
        super();
        this.#serializer = serializer;
    }

    set(key: Key_t, value: Val_t) {
        return super.set(this.#serializer(key), value);
    }

    get(key: Key_t) {
        return super.get(this.#serializer(key));
    }

    has(key: Key_t) {
        return super.has(this.#serializer(key));
    }

    delete(key: Key_t) {
        return super.delete(this.#serializer(key));
    }
}