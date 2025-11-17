async function add_blacklist_domain() {
    const ui_control = document.querySelector("#new_blacklist_domain");
    const domain = ui_control.value?.trim();
    ui_control.value = "";

    if (domain) {
        const option = await browser.storage.sync.get("domain_blacklist");
        const domain_blacklist = option.domain_blacklist || [];
        domain_blacklist.push(domain);

        await browser.storage.sync.set({ domain_blacklist });
        add_blacklist_domain_element(domain);
    }
}

function add_blacklist_domain_element(domain) {
    const domain_blacklist_ui = document.querySelector("#domain_blacklist");

    const wrapper = document.createElement("div");
    wrapper.classList.add("domain-blacklist-item");
    wrapper.setAttribute("data-domain", domain);

    const remove_button = document.createElement("button");
    remove_button.innerText = "✖";
    remove_button.addEventListener("click", () => remove_blacklist_domain(domain));
    wrapper.appendChild(remove_button);

    const domain_name = document.createElement("span");
    domain_name.innerText = domain;
    wrapper.appendChild(domain_name);

    domain_blacklist_ui.appendChild(wrapper);
}

async function load_domain_black_list() {
    const option = await browser.storage.sync.get("domain_blacklist");
    const domain_blacklist = option.domain_blacklist || [];


    domain_blacklist.forEach(domain => {
        add_blacklist_domain_element(domain);
    });
}

async function load_option(setting_name, default_value) {
    const option = await browser.storage.sync.get(setting_name);

    const ui_control = document.querySelector(`#${setting_name}`);
    ui_control.value = option[setting_name] || default_value;
}

async function load_options() {
    await load_option("reading_speed", 200);
    await load_option("popup_when_minutes_over", 0);
    await load_option("auto_hide_delay", 0);
    await load_domain_black_list();
}

async function remove_blacklist_domain(domain) {
    const option = await browser.storage.sync.get("domain_blacklist");
    const domain_blacklist = option.domain_blacklist || [];

    await browser.storage.sync.set({ domain_blacklist: domain_blacklist.filter(d => d !== domain) })

    const domain_blacklist_ui = document.querySelector("#domain_blacklist");
    document.querySelectorAll(`[data-domain*="${domain}"]`).forEach(e => domain_blacklist_ui.removeChild(e));
}

async function save_option(setting_name) {
    const ui_control = document.querySelector(`#${setting_name}`);
    const option = {};
    option[setting_name] = ui_control.value;

    await browser.storage.sync.set(option);
}


document.addEventListener("DOMContentLoaded", load_options);

const options = ["reading_speed", "popup_when_minutes_over", "auto_hide_delay"];
document.querySelectorAll(options.map(o => `#${o}`).join(","))
    .forEach(i => i.addEventListener("change", async e => await save_option(e.currentTarget.id)));

document.querySelector("#add_blacklist_domain").addEventListener("click", add_blacklist_domain);
