import * as path from "path";
import BaseDefinitionProvider, {DefinitionConfig, DefinitionItem} from "./BaseDefinitionProvider";

const CLIENT_SCRIPTS_DEFAULT_ROOT = "/client/default/js";

const requireDefinitionConfig: DefinitionConfig = { 
  wordRangeRegex: /('|")base[a-zA-Z0-9_\/\*\.]*('|")/g,
  identifyRegex: /(require\s*\(\s*)(['"])base(.*?[^\\])\2\s*\)/g,
  identifyMatchPathPosition: 4,
  identifyType: "requireClient"
};

/**
 * Definition Provider for client scripts in "require" statements.
 * @example
 * var baseProductBase = require('base/product/base');
 * 
 */
export default class RequireClientDefinitionProvider extends BaseDefinitionProvider {
  constructor(extensionConfig = {}, definitionConfig = requireDefinitionConfig) {
    super(extensionConfig, definitionConfig);
  }

  protected resolveCurrentCartridgeFilePath(definitionItem: DefinitionItem): Promise<string> {
    return Promise.resolve(null);
  }

  protected findCartridgeHierachyFilePaths(definitionItem: DefinitionItem): Promise<string[]> {
    definitionItem.path = this.getClientBasePath(definitionItem);
    return super.findCartridgeHierachyFilePaths(definitionItem);
  }

  protected getClientBasePath(definitionItem: DefinitionItem): string {
    return CLIENT_SCRIPTS_DEFAULT_ROOT + definitionItem.path;
  }
}