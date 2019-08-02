import { get, has, isFunction, set } from 'lodash';

function hasComponentLoader(serviceName, componentName) {
  return has(this.state.componentLoaders, [serviceName, componentName]);
}

function registerComponentLoader(serviceName, componentName, component) {
  if (!isFunction(component.load)) {
    return 'External script is not exposing load method';
  }

  const { componentLoaders } = this.state;

  if (!get(componentLoaders, [serviceName, componentName])) {
    this.setState({
      componentLoaders: set(componentLoaders, [serviceName, componentName], component.load),
    });
  }

  return false;
}

function load(serviceName, componentName, params) {
  const { componentsLoaded, componentLoaders } = this.state;
  const loader = get(componentLoaders, [serviceName, componentName]);

  if (loader) {
    this.setState({
      componentsLoaded: set(componentsLoaded, [serviceName, componentName], loader(params))
    });
  }

  return false;
}

function unload(serviceName, componentName) {
  const { componentsLoaded } = this.state;
  const loaded = get(componentsLoaded, [serviceName, componentName]);

  if (loaded) {
    loaded.unload();
    this.setState({
      componentsLoaded: set(componentsLoaded, [serviceName, componentName], null),
    });
  }

  return false;
}

function initializeLoader(serviceName, componentName) {
  const hasLoader = hasComponentLoader.bind(this, serviceName, componentName);
  const registerComponent = registerComponentLoader.bind(this, serviceName, componentName);
  const loadComponent = load.bind(this, serviceName, componentName);
  const unloadComponent = unload.bind(this, serviceName, componentName);

  return {
    hasLoader,
    registerComponent,
    loadComponent,
    unloadComponent,
  };
}

export { initializeLoader };
