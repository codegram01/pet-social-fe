import { auth_user } from "@/stores/auth"
import { watch } from "vue";

export default class {
	#router;

	constructor(router) {
		this.#router = router;
		this.checkPath();
        this.watchAuth();
	}

	checkPath() {
		this.#router.beforeEach((to, from) => {
			const path = to.path;
            console.log(path)
            console.log(auth_user.value)

			if (!auth_user.value) {
				if (path == "/about" 
				) {
					this.#router.push("/login");
				}
			} else {
				if (
					path == "/login" ||
					path == "/register") {
                    this.#router.push("/");
				}
			}
		})
	}

    watchAuth() {
		watch(() => auth_user.value, () => {
			if (auth_user.value) {
                // this.#router.push("/");
			} else {
				this.#router.push("/login");
			}
		})
	}
}