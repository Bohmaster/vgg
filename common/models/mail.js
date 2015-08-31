module.exports = function(Mail) {

  Mail.sendMail = function(data, cb) {


    Mail.app.models.Email.send({

      to: 'voidhmaster@gmail.com',
      from: 'tato@guiacomercialvgg.com.ar',
      subject: '1, 2, 3 probando...',
      text: data.text,
      html: '<em>Mensaje:</em> ' + data.text

    }, function(err, mail) {

      if (err) {
        cb(err);
      }

      cb(null, data);

    });

  };

  Mail.remoteMethod(

    'sendMail',

    {
      accepts: {

        arg: 'data',
        type: 'object',
        description: "Manda un mail"
        //http: function(ctx) {

          //var req = ctx.req;

          //console.log(req.body.data);

          //var result = req.body.data;

          //return result;

        //}

      },

      returns: {

        arg: 'message',
        type: 'string'

      },

      description: "Manda un mail"

    }
  );

};
