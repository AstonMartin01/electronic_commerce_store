import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ProductListComponent } from './modules/products/product-list/product-list.component';
import { ProductDetailComponent } from './modules/products/product-detail/product-detail.component';
import { CartComponent } from './modules/cart/cart/cart.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductDetailsComponent } from './modules/products/product-details/product-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingCartComponent } from './modules/cart/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './modules/checkout/checkout.component';
import { GlobalFeedbacksComponent } from './modules/global-feedbacks/global-feedbacks.component';
import { NewsletterComponent } from './modules/newsletter/newsletter.component';
import { DeliveryComponent } from './modules/delivery/delivery.component';
import { FaqComponent } from './modules/faq/faq.component';
import { ContactComponent } from './modules/contact/contact.component';
import { ProductFeedbackComponent } from './modules/products/product-feedback/product-feedback.component';
import { ProductSliderComponent } from './modules/products/product-slider/product-slider.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    CartComponent,
    HeaderComponent,
    FooterComponent,
    ProductDetailsComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    GlobalFeedbacksComponent,
    NewsletterComponent,
    DeliveryComponent,
    FaqComponent,
    ContactComponent,
    ProductFeedbackComponent,
    ProductSliderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    NgxPaginationModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
