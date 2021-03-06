import axios from "axios";

const state = {
  // better use object as set {<id>: template} to guarantee uniqueness
  templates: {},
};

const getters = {
  /* BUG: Can't get property of state.templates on readTemplate */
  getTemplateById: (state) => (id) => {
    console.log("id: " + id )
    console.log("state: " + state)
    console.log("state.templates: " + state.templates)
    console.log("state.templates[1]: " + state.templates[1])
    console.log("print state as json" + JSON.stringify(state))
    console.log(JSON.stringify(state))
    return state.templates[id];
  },
  getTemplates: (state) => {
    return Object.values(state.templates);
  },
};

const mutations = {
  setTemplates(state, templates) {
    state.templates = templates.reduce((map, obj) => {
      map[obj.id] = obj;
      return map;
    }, {});
  },
  setTemplate(state, template) {
    state.templates[template.id] = template;
  },
  updateTemplate(state, template) {
    state.templates = { ...state.templates, template };
  },
  removeTemplate(state, template) {
    delete state.templates[template.id];
  },
};

const actions = {
  readTemplates({ commit }) {
    const url = "/api/templates/";
    axios.get(url).then((response) => {
      let templates = response.data.data;
      commit("setTemplates", templates);
    });
  },
  readTemplate({ commit }, id) {
    const url = `/api/templates/${id}`;
    axios.get(url).then(response => {
      let template = response.data.data;
      commit("setTemplate", template);
    });
  },
  writeTemplate({ commit }, payload) {
    const url = "/api/templates/";
    axios.post(url, payload).then((response) => {
      let template = response.data.data;
      commit("addTemplate", template);
    });
  },
  updateTemplate({ commit }, id) {
    const url = `/api/templates/${id}/refresh`;
    axios.get(url).then((response) => {
      let template = response.data.data;
      commit("updateTemplate", template);
    });
  },
  deleteTemplate(context, id) {
    const url = `/api/templates/${id}`;
    axios.delete(url).then((response) => {
      let template = response.data.data;
      context.commit("removeTemplate", template);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
