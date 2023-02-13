import axios, { AxiosRequestConfig } from 'axios';
import * as cheerio from 'cheerio';
import FormData from 'form-data';
import { URL } from 'url';

export function get(url: string, options?: AxiosRequestConfig<any>) {
  return axios
    .get(url, options)
    .then((res) => res.data)
    .catch(
      (err) =>
        new Promise((resolve, reject) => {
          const $ = cheerio.load(err.response.data);
          $('form').each((i, el) => {
            const form = $(el);
            const action = form.attr('action');
            const method = form.attr('method');
            const inputs = new FormData();
            form.find('input').each((i, el) => {
              const input = $(el);
              const [key, value] = [input.attr('name'), input.attr('value')];
              if (key && value) inputs.append(key, value);
            });
            setTimeout(
              () =>
                axios({
                  url: new URL(url).origin + action,
                  method,
                  data: inputs,
                }).then((res) => {
                  resolve(res.data);
                }),
              5000
            );
          });
        })
    );
}
