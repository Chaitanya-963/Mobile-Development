import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  StatusBar,
  TextInput,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen({ navigation }: any) {
  const { colors, mode } = useTheme();
  const { items = [], cartTotal = 0, removeFromCart, addToCart } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCode, setAppliedCode] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const deliveryFee = items.length > 0 ? 1.99 : 0;
  const finalTotal = Math.max(0, cartTotal + deliveryFee - discount);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "BITE10") {
      setDiscount(5.0);
      setAppliedCode("BITE10 (-₹5.00)");
      setPromoCode("");
    } else {
      alert("Invalid Promo Code! Try using 'BITE10'");
    }
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccessModal(true);
    }, 2000);
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    items.forEach((item) => {
      while (item.quantity > 0) {
        removeFromCart(item.id);
        item.quantity--;
      }
    });
    navigation.navigate("Orders");
  };

  if (items.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.bg }]}>
        <StatusBar
          barStyle={mode === "dark" ? "light-content" : "dark-content"}
          backgroundColor={colors.bg}
        />
        <Ionicons name="basket-outline" size={80} color={colors.textMuted} />
        <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
          Your basket is empty
        </Text>
        <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
          Add items from a restaurant to start a new basket!
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.bg }]}
      edges={["top", "left", "right"]}
    >
      <StatusBar
        barStyle={mode === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colors.bg}
      />
      <Text style={[styles.title, { color: colors.textPrimary }]}>
        Your Basket
      </Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View
            style={[
              styles.itemCard,
              { backgroundColor: colors.bgCard, borderColor: colors.border },
            ]}
          >
            <View style={styles.itemDetails}>
              <Text style={[styles.itemName, { color: colors.textPrimary }]}>
                {item.name}
              </Text>
              <Text style={[styles.itemPrice, { color: colors.primary }]}>
                ₹{(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>

            <View
              style={[
                styles.quantityContainer,
                { backgroundColor: colors.bgElevated },
              ]}
            >
              <Pressable
                style={[styles.qtyButton, { backgroundColor: colors.bgCard }]}
                onPress={() => removeFromCart(item.id)}
              >
                <Ionicons name="remove" size={16} color={colors.primary} />
              </Pressable>
              <Text style={[styles.qtyText, { color: colors.textPrimary }]}>
                {item.quantity}
              </Text>
              <Pressable
                style={[styles.qtyButton, { backgroundColor: colors.bgCard }]}
                onPress={() => addToCart(item)}
              >
                <Ionicons name="add" size={16} color={colors.primary} />
              </Pressable>
            </View>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.footerComponentWrapper}>
            <Text
              style={[styles.sectionSubtitle, { color: colors.textSecondary }]}
            >
              Promo Voucher
            </Text>
            <View style={styles.promoFormRow}>
              <TextInput
                placeholder="Enter promo code (e.g. BITE10)"
                placeholderTextColor={colors.textMuted}
                value={promoCode}
                onChangeText={setPromoCode}
                autoCapitalize="characters"
                style={[
                  styles.promoInput,
                  {
                    backgroundColor: colors.bgCard,
                    borderColor: colors.border,
                    color: colors.textPrimary,
                  },
                ]}
              />
              <Pressable
                style={[
                  styles.applyButton,
                  {
                    backgroundColor: colors.bgElevated,
                    borderColor: colors.bgElevated,
                  },
                ]}
                onPress={handleApplyPromo}
              >
                <Text
                  style={[styles.applyButtonText, { color: colors.primary }]}
                >
                  Apply
                </Text>
              </Pressable>
            </View>
            {appliedCode.length > 0 && (
              <Text
                style={[styles.successPromoText, { color: colors.success }]}
              >
                ✓ Code {appliedCode} applied successfully!
              </Text>
            )}

            <Text
              style={[
                styles.sectionSubtitleText,
                { color: colors.textSecondary },
              ]}
            >
              Bill Details
            </Text>
            <View
              style={[
                styles.billDetailsCard,
                { backgroundColor: colors.bgCard, borderColor: colors.border },
              ]}
            >
              <View style={styles.billRow}>
                <Text
                  style={[styles.billLabel, { color: colors.textSecondary }]}
                >
                  Item Subtotal
                </Text>
                <Text style={[styles.billValue, { color: colors.textPrimary }]}>
                  ₹{cartTotal.toFixed(2)}
                </Text>
              </View>
              <View style={styles.billRow}>
                <Text
                  style={[styles.billLabel, { color: colors.textSecondary }]}
                >
                  Delivery Fee
                </Text>
                <Text style={[styles.billValue, { color: colors.textPrimary }]}>
                  ₹{deliveryFee.toFixed(2)}
                </Text>
              </View>
              {discount > 0 && (
                <View style={styles.billRow}>
                  <Text style={[styles.billLabel, { color: colors.success }]}>
                    Voucher Discount
                  </Text>
                  <Text style={[styles.billValue, { color: colors.success }]}>
                    -₹{discount.toFixed(2)}
                  </Text>
                </View>
              )}
              <View
                style={[
                  styles.billDivider,
                  { backgroundColor: colors.borderLight },
                ]}
              />
              <View style={styles.totalRow}>
                <Text
                  style={[styles.totalLabel, { color: colors.textPrimary }]}
                >
                  To Pay
                </Text>
                <Text style={[styles.totalValue, { color: colors.primary }]}>
                  ₹{finalTotal.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        }
      />

      <View
        style={[
          styles.footerPanel,
          { backgroundColor: colors.bgCard, borderColor: colors.border },
        ]}
      >
        <Pressable
          style={[
            styles.checkoutButton,
            { backgroundColor: colors.primary },
            isProcessing && styles.checkoutButtonDisabled,
          ]}
          onPress={handleCheckout}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator size="small" color={colors.textInverse} />
          ) : (
            <Text style={[styles.checkoutText, { color: colors.textInverse }]}>
              Place Order • ₹{finalTotal.toFixed(2)}
            </Text>
          )}
        </Pressable>
      </View>

      <Modal visible={showSuccessModal} transparent={true} animationType="fade">
        <View style={styles.modalBackdrop}>
          <View
            style={[
              styles.successModalCard,
              { backgroundColor: colors.bgCard },
            ]}
          >
            <View
              style={[
                styles.successIconCircle,
                { backgroundColor: mode === "dark" ? "#142D20" : "#D1FAE5" },
              ]}
            >
              <Ionicons
                name="checkmark-done"
                size={44}
                color={colors.success}
              />
            </View>
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>
              Order Confirmed!
            </Text>
            <Text
              style={[styles.modalSubtitle, { color: colors.textSecondary }]}
            >
              Your payment of ₹{finalTotal.toFixed(2)} went through flawlessly.
              The kitchen is already processing your meal.
            </Text>
            <Pressable
              style={[styles.trackButton, { backgroundColor: colors.primary }]}
              onPress={handleModalClose}
            >
              <Text
                style={[styles.trackButtonText, { color: colors.textInverse }]}
              >
                Track Live Status
              </Text>
              <Ionicons
                name="arrow-forward"
                size={16}
                color={colors.textInverse}
              />
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 14,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  itemCard: {
    flexDirection: "row",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "700",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 4,
    gap: 12,
  },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: {
    fontSize: 14,
    fontWeight: "700",
    minWidth: 16,
    textAlign: "center",
  },
  footerComponentWrapper: {
    marginTop: 16,
  },
  sectionSubtitle: {
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 10,
    paddingLeft: 2,
  },
  sectionSubtitleText: {
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 18,
    marginBottom: 10,
    paddingLeft: 2,
  },
  promoFormRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 6,
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 14,
    fontSize: 14,
  },
  applyButton: {
    height: 48,
    paddingHorizontal: 18,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  applyButtonText: { fontSize: 14, fontWeight: "700" },
  successPromoText: {
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
    marginBottom: 4,
  },
  billDetailsCard: { borderRadius: 16, padding: 16, borderWidth: 1 },
  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  billLabel: { fontSize: 14, fontWeight: "500" },
  billValue: { fontSize: 14, fontWeight: "700" },
  billDivider: { height: 1, marginVertical: 4, marginBottom: 12 },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: { fontSize: 16, fontWeight: "800" },
  totalValue: { fontSize: 20, fontWeight: "900" },
  footerPanel: { borderTopWidth: 1, padding: 16, paddingBottom: 24 },
  checkoutButton: {
    height: 54,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  checkoutButtonDisabled: { backgroundColor: "#A0A0A0", opacity: 0.5 },
  checkoutText: { fontSize: 16, fontWeight: "700" },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: { fontSize: 14, textAlign: "center", lineHeight: 20 },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  successModalCard: {
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  successIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: { fontSize: 22, fontWeight: "900", marginBottom: 8 },
  modalSubtitle: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
    fontWeight: "500",
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  trackButton: {
    flexDirection: "row",
    height: 52,
    width: "100%",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  trackButtonText: { fontSize: 16, fontWeight: "700" },
});
