async function load_options() {
    await load_option("reading_speed", 200);
    await load_option("popup_when_minutes_over", 0);
}

async function load_option(setting_name, default_value)
{
    const option = await browser.storage.sync.get(setting_name);

    const ui_control = document.querySelector(`#${setting_name}`);
    ui_control.value = option[setting_name] || default_value;
}

async function save_option(setting_name)
{
    const ui_control = document.querySelector(`#${setting_name}`);

    const option = {};
    option[setting_name] = ui_control.value;

    await browser.storage.sync.set(option);
}


document.addEventListener("DOMContentLoaded", load_options);
document.querySelectorAll("input")
    .forEach(i => i.addEventListener("change", async e => await save_option(e.currentTarget.id)));