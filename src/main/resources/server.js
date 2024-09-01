render = (template, model) => {
    return template
        .replace('SERVER_RENDERED_HTML', model.renderedHtml)
        .replace('SERVER_RENDERED_STATE', model.photos);
};
