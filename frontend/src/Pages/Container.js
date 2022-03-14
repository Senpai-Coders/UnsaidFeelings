import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from "./Home";
import WrittenDetails from "./WrittenDetails";
import About from "./About";
import NF404 from "./NF404";


const Container = () => {
  return <div>
      <Switch>
            <Route exact path="/about" component={About} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/writtenFeelings/:feelings_id" component={WrittenDetails} />
            <Route exact path="/" component={Home} />
            <Route path="*" component={NF404} /> {/* Not Found */}
      </Switch>
  </div>;
};

export default Container;