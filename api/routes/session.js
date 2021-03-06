const ForgeSDK = require('@arcblock/forge-sdk');

module.exports = {
  init(app) {
    app.get('/api/session', async (req, res) => {
      //ForgeSDK.connect('https://zinc.abtnetwork.io/api');
      (async () => {
         const query_res = await ForgeSDK.doRawQuery(`{
           getForgeState {
             code
             state {
               token {
                 symbol
                 decimal
               }
             }
           }
         }`);

         //console.log(query_res.getForgeState.state.token);
         res.json({ user: req.user, token: query_res.getForgeState.state.token });
      })();
    });
    
    app.get('/api/session_user_only', async (req, res) => {
      console.log('api.get.session_user_only')
      res.json({ user: req.user, token: '' });
    });

    app.post('/api/logout', (req, res) => {
      req.user = null;
      res.json({ user: null });
    });
  },
};
