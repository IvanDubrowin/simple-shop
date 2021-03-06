import React from "react"
import { connect } from "react-redux"
import { Switch, Route } from "react-router-dom"
import { createMuiTheme, ThemeProvider, makeStyles } from "@material-ui/core/styles"
import grey from "@material-ui/core/colors/grey"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Content from "./components/Content/Content"
import Shop from "./components/Shop/Shop"
import Cart from "./components/Cart/Cart"
import { getUiConfig } from "./redux/reducers/config-reducer"
import { getCategories } from "./redux/reducers/categories-reducer"
import { getCartData } from "./redux/reducers/cart-reducer"
import Preloader from "./components/Preloader/Preloader"
import Error from "./components/Errors/Error"

const theme = createMuiTheme({
    palette: {
        primary: {
            main: grey[900]
        }
    },
    typography: {
        fontFamily: "'Cabin', sans-serif",
        letterSpacing: '3px'
    }
})

const useStyles = makeStyles(theme => ({
    mainWrapper: {
        display: 'flex',
        minHeight: 'calc(100vh - 245px)',
        flex: '1 0 auto',
        justifyContent: 'center',
        marginTop: '80px'
    }
}))

const App = ({ initialized, getUiConfig, getCategories, getCartData }) => {

    const classes = useStyles()

    if (!initialized) {
        getCategories()
        getCartData()
        getUiConfig()
        return <ThemeProvider theme={theme}><Preloader /></ThemeProvider>
    }
    
    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Header />
                <div className={classes.mainWrapper}>
                    <Switch>
                        <Route exact path='/' component={Content} />
                        <Route path='/shop/categories/:id' component={Shop} />
                        <Route path='/cart' component={Cart} />
                        <Route path='/error' 
                               render={() => <Error text="Упс! Что-то пошло не так" code={500} />} 
                        />
                        <Route path='*' 
                               render={() => <Error text="Упс! Страница не найдена" code={404} />}
                        />
                    </Switch>
                </div>
                <Footer />
            </ThemeProvider>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return ({
        initialized: state.get('config').get('initialized')
    })
}

export default connect(mapStateToProps, { getUiConfig, getCategories, getCartData })(App)