import { ALERT_TYPE, SCROLL_TO } from '~/plugins/dictionary';

export default ({ app }, inject) => {
  // asset =========================================================================================================//
  const assets = (path) => require(`~/assets/sources/themes/${app.store.state.theme}${path}`)
  // usage $assets(path)
  inject('assets', assets);


  // console-log =========================================================================================================//
  const log = (...msgs) => {
    msgs.forEach((msg, i) => {
      console.log(`${i+1}:`, msg);
    });
  }
  // usage $log(msg)
  inject('log', log);


  // target-tooltip =========================================================================================================//
  const targetTooltip = (el, isResizeY = 0, isResizeX = 0) => {
    setTimeout(() => {
      const target = document.querySelector(el);
      document.documentElement.style.setProperty('--x-tooltip', `${target.getBoundingClientRect().left + isResizeX}px`)
      document.documentElement.style.setProperty('--y-tooltip', `${target.getBoundingClientRect().top + isResizeY}px`)
    }, 100);
  }
  /* usage:
    $targetTooltip(target) <-- if mounted
    $targetTooltip(target, y, x) <-- if resize
  */
  inject('targetTooltip', targetTooltip);


  // alerts =========================================================================================================//
  const alerts = (key, {title, desc, color, timeout, centered, top, bottom, left, right} = {}) => {
    if (ALERT_TYPE.VALUES().includes(key)) {
      app.router.app.$children.find(data=>data.$el === document.querySelector(".v-application")).$refs.alerts.
        GenerateAlert(key, title, desc, color, timeout, centered, top, bottom, left, right);
    } else {
      throw new Error('Invalid key, try using any `ALERT_TYPE` value.')
    }
  }
  // usage $alert(key, {title, desc})
  inject('alert', alerts);


  // confirmMsg =========================================================================================================//
  const confirmMsg = ({title, desc, color, fSuccess, fCancel, fOpen} = {}) => {
    app.router.app.$children.find(data=>data.$el === document.querySelector(".v-application")).$refs.confirmMsg.
      GenerateMsg(fSuccess, fCancel, fOpen, title, desc, color);
  }
  // usage $alert(key, {title, desc})
  inject('confirmMsg', confirmMsg);


  // scroll-to =========================================================================================================//
  const scrollTo = id => {
    if (SCROLL_TO.VALUES().includes(id)) {
      setTimeout(()=> {
        window.scrollTo(0, 1);
      }, 0);
    } else {
      const el = document.getElementById(id);
      if (el) {el.scrollIntoView(true)}
    }
  }
  // usage $scrollTo(id)
  inject('scrollTo', scrollTo);


  // load-cursor =========================================================================================================//
  const loadCursor = key => {
    if (key === true) {
      document.documentElement.style.cursor = "progress";
      document.documentElement.style.pointerEvents = "none";
    } else if (key === false) {
      document.documentElement.style.cursor = "initial";
      document.documentElement.style.pointerEvents = "all";
    } else {
      throw new Error("You must to pass Boolean")
    }
  }
  // usage $loadCursor(boolean)
  inject('loadCursor', loadCursor);


  // equalData =========================================================================================================//
  const equalData = (toData, fromData) => {
    for (const [keys, values] of Object.entries(toData)) {
      const dataValues = fromData[keys]
      if (typeof dataValues === "object") { Object.keys(values).forEach(key => { values[key] = dataValues[key] }) }
      else { toData[keys] = dataValues }
    }
    return toData
  }
  // usage $equalData(to, from)
  inject('equalData', equalData);


  // formData =========================================================================================================//
  const formData = (form) => {
    const formData = new FormData();
    for (const [keys, values] of Object.entries(form)) {
      // set empty string in null 
      if (form[keys] && typeof form[keys] === "object") {
        Object.keys(values).forEach(key => { values[key] ??= "" })
      } else { form[keys] ??= "" }
      
      // push to form data
      const
        excludeUrl = !(/\.(gif|jpg|jpeg|tiff|png)$/i).test(values),
        file = values?.type;
      if (typeof values === 'object' && !file) { formData.append(keys, JSON.stringify(values).toLowerCase()) } // if object only
      else if (file) { formData.append(keys, values) } // if file object
      else if (excludeUrl) { formData.append(keys, typeof values === 'string' ? values.toLowerCase() : values || "") } // else
    }
    return formData
  }
  // usage $formData(form)
  inject('formData', formData);
}
