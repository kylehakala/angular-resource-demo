/**
 * @file
 * A collection of query-building helpers.
 */

'use strict';

/**
 * Asynchronously finds all of a model based on the given request parameters.
 *
 * @param {Model} model
 *   The Mongoose model to query.
 * @param {Object} [params]
 *   A map of query string parameters.
 *
 * @return {Promise}
 *   The promise returned by the model.
 */
export function find(model, params) {
  params = params || {};

  // Get the filter parameters because we're going to be using those right away:
  var filters = typeof params['filter'] === 'object' ?
    params['filter'] : {};

  // Create the query:
  var query = model.find(filters);

  // Set the sort order (we're expecting comma-delimited, Mongoose is expecting
  // space-delimited):
  if (typeof params['order'] === 'string') {
    query.sort(params['order'].replace(',', ' '));
  }

  // Set result offset:
  if (typeof params['offset'] === 'string') {
    query.skip(parseInt(params['offset']));
  }

  // Set result count:
  if (typeof params['limit'] === 'string') {
    query.limit(parseInt(params['limit']));
  }

  return query.execAsync();
};
