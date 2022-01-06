/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  */

"use strict";

const { join, dirname } = require("webpack/lib/util/fs");

/** @typedef {import("./Compiler")} Compiler */
/** @typedef {function(TODO): void} ModuleReplacer */

class NormalModuleReplacementEnhancedPlugin {
  /**
   * Create an instance of the plugin
   * @param {RegExp} resourceRegExp the resource matcher
   * @param {string|ModuleReplacer} newResource the resource replacement
   */
  constructor(resourceRegExp, newResource) {
    this.resourceRegExp = resourceRegExp;
    this.newResource = newResource;
  }

  /**
   * Apply the plugin
   * @param {Compiler} compiler the compiler instance
   * @returns {void}
   */
  apply(compiler) {
    const resourceRegExp = this.resourceRegExp;
    const newResource = this.newResource;
    compiler.hooks.normalModuleFactory.tap(
      "NormalModuleReplacementPlugin",
      nmf => {
        nmf.hooks.beforeResolve.tap("NormalModuleReplacementPlugin", result => {
          // console.log(result);

          if(result.contextInfo && result.contextInfo.issuer && result.contextInfo.issuer.split('/').includes('extendedProject')) {
            // console.log('extendedProject match');
            // console.log(result);
            // return result;
            return;
          }

          if (resourceRegExp.test(result.request)) {
            if (typeof newResource === "function") {
              newResource(result);
            } else {
              result.request = newResource;
            }
          }
        });

        nmf.hooks.resolve.tap("NormalModuleReplacementPlugin", result => {
          console.log(result);
        });


        nmf.hooks.afterResolve.tap("NormalModuleReplacementPlugin", result => {
          const createData = result.createData;
          if (resourceRegExp.test(createData.resource)) {
            if (typeof newResource === "function") {
              newResource(result);
            } else {
              const fs = compiler.inputFileSystem;
              if (
                newResource.startsWith("/") ||
                (newResource.length > 1 && newResource[1] === ":")
              ) {
                createData.resource = newResource;
              } else {
                createData.resource = join(
                  fs,
                  dirname(fs, createData.resource),
                  newResource
                );
              }
            }
          }
        });
      }
    );
  }
}

module.exports = NormalModuleReplacementEnhancedPlugin;
